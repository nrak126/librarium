"use client";

import { Header } from "../components/Header";
import "./styles/globals.css";
import style from "./styles/layout.module.scss";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isBookCheck = pathname === "/book/add" || pathname === "/book/rental";
  const isAuth = pathname.startsWith("/auth/");

  return (
    <html lang="ja">
      <body>
        <div className={isAuth ? style.auth : style.background}>
          <Header />
          <div className={isBookCheck ? undefined : style.main}>
            <main className={isBookCheck ? undefined : style.mainContents}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
