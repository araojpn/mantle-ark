import { createPublicClient, defineChain, http } from "viem";

export const mantleMainnet = defineChain({
  id: 5000,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "Mantle",
    symbol: "MNT",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://explorer.mantle.xyz",
    },
  },
});

export const MANTLE_RPC_URL =
  process.env.NEXT_PUBLIC_MANTLE_RPC_URL?.trim() || "https://rpc.mantle.xyz";

export const mantleClient = createPublicClient({
  chain: mantleMainnet,
  transport: http(MANTLE_RPC_URL),
});
