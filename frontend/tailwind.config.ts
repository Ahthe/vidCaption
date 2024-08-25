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
        matteBlack: "#121212",
        matteBlackText: "#E5E5E5",
        matteBlackBorder: "#333333",
        vidcaption: {
          blue: "rgb(101, 233, 196)",
          red: "rgb(67, 230, 199)",
          primary: "rgb(44, 224, 254)",
          "primary-hover": "rgb(44, 234, 254)",
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
