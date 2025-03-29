"use client";

import { Header } from "../../components/Header";
import style from "../styles/layout.module.scss";
import { usePathname } from "next/navigation";
import React from "react";

export const LayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isBookCheck =
    pathname === "/books/add/barcode" || pathname === "/books/rental/barcode";
  const isAuth = pathname === "/auth" || pathname.startsWith("/auth/");

  return (
    <div className={isAuth ? undefined : style.background}>
      {!isAuth && <Header />}
      <div className={isAuth || isBookCheck ? undefined : style.main}>
        <main
          className={isAuth || isBookCheck ? undefined : style.mainContents}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
