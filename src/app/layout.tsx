import { LayoutClient } from "./components/LayoutClient"; // 別ファイルからインポート
import "./styles/globals.css";
import React from "react";

export const metadata = {
  title: "Librarium",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
