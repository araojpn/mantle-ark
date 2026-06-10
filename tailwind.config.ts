import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ark: {
          black: "#070812",
          panel: "#101327",
          gold: "#f4c96a",
          blue: "#4f8cff",
          violet: "#9d6cff",
          cyan: "#67e8f9",
          danger: "#ff6b8a",
        },
      },
      boxShadow: {
        tarot: "0 26px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
