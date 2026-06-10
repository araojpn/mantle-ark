import {
  type Address,
  formatEther,
  formatUnits,
  parseAbi,
  parseAbiItem,
} from "viem";
import { mantleClient } from "./mantle-client";
import { normalizeAddress } from "./numerology";
import type { DiscoveredToken, MantleFeatures } from "./types";

const DEFAULT_BLOCK_DEPTH = 2_000n;
const DEFAULT_TX_SCAN_BLOCKS = 120n;
const MAX_TOKEN_MULTICALLS = 24;

const transferEvent = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)",
);
const approvalEvent = parseAbiItem(
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
);
const erc20Abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
]);

interface MantleFeatureOptions {
  blockDepth?: bigint;
  txScanBlocks?: bigint;
}

type SafeLog = Awaited<ReturnType<typeof mantleClient.getLogs>>[number];

function asAddress(address: string): Address {
  return normalizeAddress(address) as Address;
}

function toNumber(value: bigint): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function ratio(part: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return part / total;
}

function getStd(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length;

  return Math.sqrt(variance);
}

async function safeLogs(
  args: Parameters<typeof mantleClient.getLogs>[0],
): Promise<SafeLog[]> {
  try {
    return await mantleClient.getLogs(args);
  } catch {
    return [];
  }
}

async function safeTokenMetadata(
  wallet: Address,
  tokenAddresses: Address[],
): Promise<DiscoveredToken[]> {
  const limitedTokens = tokenAddresses.slice(0, MAX_TOKEN_MULTICALLS);

  if (limitedTokens.length === 0) {
    return [];
  }

  try {
    const contracts = limitedTokens.flatMap((tokenAddress) => [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [wallet],
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ]);
    const results = (await mantleClient.multicall({
      allowFailure: true,
      contracts,
    })) as Array<{ status: "success" | "failure"; result?: unknown }>;

    return limitedTokens.map((tokenAddress, index) => {
      const balanceResult = results[index * 3];
      const symbolResult = results[index * 3 + 1];
      const decimalsResult = results[index * 3 + 2];
      const balanceRaw =
        balanceResult?.status === "success" && typeof balanceResult.result === "bigint"
          ? balanceResult.result
          : 0n;
      const symbol =
        symbolResult?.status === "success" && typeof symbolResult.result === "string"
          ? symbolResult.result
          : undefined;
      const decimals =
        decimalsResult?.status === "success" && typeof decimalsResult.result === "number"
          ? decimalsResult.result
          : undefined;

      return {
        address: tokenAddress,
        symbol,
        decimals,
        balanceRaw: balanceRaw.toString(),
        balanceFormatted:
          typeof decimals === "number" ? formatUnits(balanceRaw, decimals) : undefined,
      };
    });
  } catch {
    return limitedTokens.map((tokenAddress) => ({ address: tokenAddress }));
  }
}

async function scanRecentTransactions(
  wallet: Address,
  latestBlock: bigint,
  txScanBlocks: bigint,
) {
  const fromBlock = latestBlock > txScanBlocks ? latestBlock - txScanBlocks : 0n;
  const blockNumbers: bigint[] = [];

  for (let block = fromBlock; block <= latestBlock; block += 1n) {
    blockNumbers.push(block);
  }

  const blocks = await Promise.allSettled(
    blockNumbers.map((blockNumber) =>
      mantleClient.getBlock({ blockNumber, includeTransactions: true }),
    ),
  );
  const lowerWallet = wallet.toLowerCase();
  const txTargets = new Map<string, number>();
  const timestamps: number[] = [];
  let recentTxCount = 0;

  for (const blockResult of blocks) {
    if (blockResult.status !== "fulfilled") {
      continue;
    }

    const block = blockResult.value;
    const blockTimestamp = toNumber(block.timestamp);

    for (const tx of block.transactions) {
      if (typeof tx === "string") {
        continue;
      }

      const from = tx.from?.toLowerCase();
      const to = tx.to?.toLowerCase();

      if (from !== lowerWallet && to !== lowerWallet) {
        continue;
      }

      recentTxCount += 1;
      timestamps.push(blockTimestamp);

      if (to) {
        txTargets.set(to, (txTargets.get(to) || 0) + 1);
      }
    }
  }

  const sortedTimestamps = [...timestamps].sort((a, b) => a - b);
  const intervals = sortedTimestamps
    .slice(1)
    .map((timestamp, index) => timestamp - sortedTimestamps[index])
    .filter((interval) => interval >= 0);
  const repeatedCount = txTargets.size > 0 ? Math.max(...txTargets.values()) : 0;

  return {
    avgTxIntervalSec:
      intervals.length > 0
        ? intervals.reduce((sum, value) => sum + value, 0) / intervals.length
        : 0,
    intervalStdSec: getStd(intervals),
    recentTxCount,
    repeatedContractRatio: ratio(repeatedCount, recentTxCount),
    txContractCount: txTargets.size,
  };
}

export async function getMantleFeatures(
  address: string,
  options: MantleFeatureOptions = {},
): Promise<MantleFeatures> {
  const wallet = asAddress(address);
  const latestBlock = await mantleClient.getBlockNumber();
  const nativeBalance = await mantleClient.getBalance({ address: wallet });
  const blockDepth = options.blockDepth ?? DEFAULT_BLOCK_DEPTH;
  const txScanBlocks = options.txScanBlocks ?? DEFAULT_TX_SCAN_BLOCKS;
  const fromBlock = latestBlock > blockDepth ? latestBlock - blockDepth : 0n;
  const toBlock = latestBlock;

  const [incomingTransfers, outgoingTransfers, approvals, txScan] = await Promise.all([
    safeLogs({
      event: transferEvent,
      args: { to: wallet },
      fromBlock,
      toBlock,
    }),
    safeLogs({
      event: transferEvent,
      args: { from: wallet },
      fromBlock,
      toBlock,
    }),
    safeLogs({
      event: approvalEvent,
      args: { owner: wallet },
      fromBlock,
      toBlock,
    }),
    scanRecentTransactions(wallet, latestBlock, txScanBlocks).catch(() => ({
      avgTxIntervalSec: 0,
      intervalStdSec: 0,
      recentTxCount: 0,
      repeatedContractRatio: 0,
      txContractCount: 0,
    })),
  ]);
  const tokenSet = new Set<string>();

  for (const log of [...incomingTransfers, ...outgoingTransfers]) {
    tokenSet.add(log.address.toLowerCase());
  }

  const tokenAddresses = [...tokenSet] as Address[];
  const discoveredTokens = await safeTokenMetadata(wallet, tokenAddresses);
  const uniqueContracts = new Set([
    ...tokenAddresses.map((token) => token.toLowerCase()),
    ...approvals.map((approval) => approval.address.toLowerCase()),
  ]).size;

  return {
    nativeBalanceMnt: Number(formatEther(nativeBalance)),
    recentTxCount: txScan.recentTxCount,
    erc20TransferCount: incomingTransfers.length + outgoingTransfers.length,
    tokenCount: tokenAddresses.length,
    uniqueContracts: Math.max(uniqueContracts, txScan.txContractCount),
    incomingTransferCount: incomingTransfers.length,
    outgoingTransferCount: outgoingTransfers.length,
    approvalCount: approvals.length,
    repeatedContractRatio: txScan.repeatedContractRatio,
    avgTxIntervalSec: txScan.avgTxIntervalSec,
    intervalStdSec: txScan.intervalStdSec,
    discoveredTokens,
    dataSource: "mantle-rpc",
  };
}
