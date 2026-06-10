import type { Attribute, CardDefinition } from "./types";

export const cardDefinitions: CardDefinition[] = [
  {
    id: 1,
    roman: "I",
    name: "The Rookie Hamster",
    role: "Beginner",
    animal: "Hamster",
    defaultAttribute: "Neutral",
    animalImage: "/card-art/rookie-hamster-watercolor-v1.png",
    symbol: "HM",
    palette: { from: "#f4c96a", to: "#8f5d28", accent: "#ffe6a3" },
  },
  {
    id: 2,
    roman: "XVII",
    name: "The Airdrop Fox",
    role: "Airdrop Hunter",
    animal: "Fox",
    defaultAttribute: "Light",
    animalImage: "/card-art/airdrop-fox-watercolor-v1.png",
    symbol: "FX",
    palette: { from: "#ff8a4c", to: "#6f2a45", accent: "#ffd2a6" },
  },
  {
    id: 3,
    roman: "VII",
    name: "The Gas Cheetah",
    role: "Trader",
    animal: "Cheetah",
    defaultAttribute: "Dark",
    animalImage: "/card-art/gas-cheetah-watercolor-v1.png",
    symbol: "CT",
    palette: { from: "#f4c96a", to: "#271126", accent: "#ffec9f" },
  },
  {
    id: 4,
    roman: "XIV",
    name: "The Yield Bee",
    role: "DeFi Farmer",
    animal: "Bee",
    defaultAttribute: "Light",
    animalImage: "/card-art/yield-bee-watercolor-v1.png",
    symbol: "BE",
    palette: { from: "#f7d85c", to: "#252012", accent: "#fff1a6" },
  },
  {
    id: 5,
    roman: "IV",
    name: "The Diamond Turtle",
    role: "Holder",
    animal: "Turtle",
    defaultAttribute: "Light",
    animalImage: "/card-art/diamond-turtle-watercolor-v1.png",
    symbol: "TR",
    palette: { from: "#67e8f9", to: "#124a43", accent: "#b8fff6" },
  },
  {
    id: 6,
    roman: "XXI",
    name: "The Whale Lion",
    role: "Whale",
    animal: "Lion",
    defaultAttribute: "Light",
    animalImage: "/card-art/whale-lion-watercolor-v1.png",
    symbol: "LN",
    palette: { from: "#ffd36e", to: "#68351e", accent: "#fff0b8" },
  },
  {
    id: 7,
    roman: "IX",
    name: "The Oracle Owl",
    role: "Smart User",
    animal: "Owl",
    defaultAttribute: "Light",
    animalImage: "/card-art/oracle-owl-watercolor-v1.png",
    symbol: "OW",
    palette: { from: "#9d6cff", to: "#1f255e", accent: "#d8c8ff" },
  },
  {
    id: 8,
    roman: "VIII",
    name: "The Bridge Eagle",
    role: "Bridge User",
    animal: "Eagle",
    defaultAttribute: "Neutral",
    animalImage: "/card-art/bridge-eagle-watercolor-v1.png",
    symbol: "EG",
    palette: { from: "#4f8cff", to: "#172c55", accent: "#b7d2ff" },
  },
  {
    id: 9,
    roman: "XV",
    name: "The Cyber Penguin",
    role: "Bot-like",
    animal: "Penguin",
    defaultAttribute: "Dark",
    animalImage: "/card-art/cyber-penguin-watercolor-v1.png",
    symbol: "PG",
    palette: { from: "#67e8f9", to: "#101327", accent: "#a8f7ff" },
  },
  {
    id: 10,
    roman: "X",
    name: "The Clone Ant",
    role: "Sybil-like",
    animal: "Ant",
    defaultAttribute: "Dark",
    animalImage: "/card-art/clone-ant-watercolor-v1.png",
    symbol: "AN",
    palette: { from: "#ff6b8a", to: "#401523", accent: "#ffc0cd" },
  },
  {
    id: 11,
    roman: "XIII",
    name: "The Shadow Shark",
    role: "Shadow-type",
    animal: "Shark",
    defaultAttribute: "Dark",
    animalImage: "/card-art/shadow-shark-watercolor-v1.png",
    symbol: "SH",
    palette: { from: "#8b9bb4", to: "#070812", accent: "#ccd6e5" },
  },
  {
    id: 12,
    roman: "VI",
    name: "The Plain Cat",
    role: "Regular User",
    animal: "Cat",
    defaultAttribute: "Neutral",
    animalImage: "/card-art/plain-cat-watercolor-v1.png",
    symbol: "CA",
    palette: { from: "#c0a486", to: "#30263f", accent: "#ead8c4" },
  },
];

export function getCardByName(name: string): CardDefinition {
  const card = cardDefinitions.find((item) => item.name === name);

  if (!card) {
    return cardDefinitions[11];
  }

  return card;
}

export function getAttributeClassName(attribute: Attribute): string {
  if (attribute === "Light") {
    return "text-amber-200";
  }

  if (attribute === "Dark") {
    return "text-rose-200";
  }

  return "text-sky-200";
}
