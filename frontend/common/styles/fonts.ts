import { Metrophobic, Roboto } from "next/font/google";

export const metrophobic = Metrophobic({ subsets: ["latin"], weight: ["400"] });
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
