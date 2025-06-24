"use client";

import { usePathname } from "next/navigation";
import style from "../styles/layout.module.scss";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // スタイルを適用しないパス
  const isAuth = pathname === "/auth" || pathname.startsWith("/auth/");
  const isBarcode =
    pathname === "/books/add/barcode" || pathname === "/books/rental/barcode";

  // 通常のレイアウトスタイルを適用するかどうか
  const shouldApplyLayout = !isAuth && !isBarcode;

  if (!shouldApplyLayout) {
    return <main>{children}</main>;
  }

  return (
    <div className={style.background}>
      <div className={style.main}>
        <main className={style.mainContents}>{children}</main>
      </div>
    </div>
  );
}
