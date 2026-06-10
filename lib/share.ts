import {
  formatAttribute,
  formatCardName,
  formatFortuneHeadline,
  formatScoreLabel,
  type Locale,
} from "./i18n";
import type { DiagnosisResult } from "./types";

export function generateShareText(result: DiagnosisResult, locale: Locale = "en"): string {
  if (locale === "ja") {
    return [
      `私のMantleオンチェーン動物タロットカードは ${result.card.roman} - ${formatCardName(
        result.card,
        locale,
      )}。`,
      `今月: ${formatFortuneHeadline(result.thisMonthFortune, locale)} #${result.thisMonthFortune.fortuneNumber}。来月: ${formatFortuneHeadline(result.nextMonthFortune, locale)} #${result.nextMonthFortune.fortuneNumber}。`,
      `属性: ${formatAttribute(result.attribute, locale)}。レベル ${result.level}。${formatScoreLabel("bot", locale)}: ${result.scores.bot}/100。`,
      "Mantle Arkでウォレットの動物占いカードを引いてみて。",
    ].join("\n");
  }

  return [
    `My Mantle onchain animal tarot card is ${result.card.roman} - ${formatCardName(
      result.card,
      locale,
    )}.`,
    `This month: ${formatFortuneHeadline(result.thisMonthFortune, locale)} #${result.thisMonthFortune.fortuneNumber}. Next month: ${formatFortuneHeadline(result.nextMonthFortune, locale)} #${result.nextMonthFortune.fortuneNumber}.`,
    `Attribute: ${formatAttribute(result.attribute, locale)}. Level ${result.level}. ${formatScoreLabel("bot", locale)}: ${result.scores.bot}/100.`,
    "Reveal your wallet's animal fortune on Mantle Ark.",
  ].join("\n");
}

export function generateXShareUrl(result: DiagnosisResult, locale: Locale = "en"): string {
  const text = generateShareText(result, locale);

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
