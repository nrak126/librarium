// fonts.ts（専用ファイルにしてもOK）
import { Alegreya_Sans_SC } from "next/font/google";

// Alegreya Sans SC（Italicあり, Weight全指定）
export const alegreyaSansSC = Alegreya_Sans_SC({
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
