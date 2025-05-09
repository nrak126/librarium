import { LayoutClient } from "./components/LayoutClient"; // 別ファイルからインポート
import "./styles/globals.css";
import React from "react";
import { Almarai } from "next/font/google";

export const metadata = {
  title: "Librarium",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/favicon.ico",
  },
};

export const font = Almarai({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
