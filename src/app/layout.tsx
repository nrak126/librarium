import { LayoutClient } from "./components/LayoutClient"; // 別ファイルからインポート
import "./styles/globals.css";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <title>Librarium</title>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
