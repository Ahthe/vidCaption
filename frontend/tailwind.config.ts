import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tiktok: {
          blue: "#65D2E9",
          red: "#E6436D",
          primary: "#FE2C55",
          "primary-hover": "#E4274C",
          "light-gray": "#F1F1F2",
          gray: "#9EA0A5",
          black: "#161823",
        },
      },
    },
  },
  plugins: [],
};
export default config;
