import "./styles/globals.css";
import React from "react";
import { Almarai } from "next/font/google";
import ConditionalHeader from "./components/ConditionalHeader";
// import AppLoader from "./components/AppLoader";

export const metadata = {
  title: "Librarium",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/favicon.ico",
  },
};

const font = Almarai({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={font.className}>
        {/* <AppLoader> */}
        <ConditionalHeader />
        <main>{children}</main>
        {/* </AppLoader> */}
      </body>
    </html>
  );
}
