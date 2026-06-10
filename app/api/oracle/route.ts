import { NextResponse } from "next/server";
import type { DiagnosisResult, OracleProvider } from "@/lib/types";

interface OracleRequest {
  result?: DiagnosisResult;
  locale?: "en" | "ja";
}

interface CloudflareAiResponse {
  result?: {
    response?: string;
  };
  success?: boolean;
}

const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

function fallbackResponse(result: DiagnosisResult, oracleProvider: OracleProvider = "fallback") {
  return NextResponse.json({
    oracleComment: result.oracleComment,
    oracleProvider,
  });
}

function getCloudflareEnv() {
  return {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? process.env.CF_ACCOUNT_ID,
    apiToken: process.env.CLOUDFLARE_AI_TOKEN ?? process.env.CF_API_TOKEN,
    model: process.env.CLOUDFLARE_AI_MODEL ?? DEFAULT_MODEL,
  };
}

function buildPrompt(result: DiagnosisResult, locale: "en" | "ja") {
  return [
    "You are the optional oracle voice for Mantle Ark Tarot.",
    "Write one concise, mystical, consumer-friendly monthly onchain tarot message.",
    "Do not give financial advice. Do not accuse the wallet of being a bot, attacker, or hacker.",
    "Mention that Bot-likeness and Threat Aura are entertainment estimates if relevant.",
    `Language: ${locale === "ja" ? "Japanese" : "English"}.`,
    `Animal: ${result.card.name}. Attribute: ${result.attribute}. Level: ${result.level}.`,
    `This month: ${result.thisMonthFortune.arcanaNumber} - ${result.thisMonthFortune.arcanaName} (${result.thisMonthFortune.position}).`,
    `Next month: ${result.nextMonthFortune.arcanaNumber} - ${result.nextMonthFortune.arcanaName} (${result.nextMonthFortune.position}).`,
    `Scores: skill ${result.scores.skill}, explorer ${result.scores.explorer}, degen ${result.scores.degen}, bot ${result.scores.bot}, threat ${result.scores.threat}, holder ${result.scores.holder}, beginner ${result.scores.beginner}, whale ${result.scores.whale}.`,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OracleRequest;
    const result = body.result;

    if (!result) {
      return NextResponse.json(
        { oracleComment: "Missing tarot result.", oracleProvider: "fallback" },
        { status: 400 },
      );
    }

    const { accountId, apiToken, model } = getCloudflareEnv();

    if (!accountId || !apiToken) {
      return fallbackResponse(result);
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You write short, safe, shareable tarot-style copy for an onchain entertainment app.",
            },
            {
              role: "user",
              content: buildPrompt(result, body.locale ?? "en"),
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      return fallbackResponse(result);
    }

    const data = (await response.json()) as CloudflareAiResponse;
    const oracleComment = data.result?.response?.trim();

    if (!data.success || !oracleComment) {
      return fallbackResponse(result);
    }

    return NextResponse.json({
      oracleComment,
      oracleProvider: "cloudflare-ai" satisfies OracleProvider,
    });
  } catch {
    return NextResponse.json({
      oracleComment: "The deterministic oracle is active.",
      oracleProvider: "fallback" satisfies OracleProvider,
    });
  }
}
