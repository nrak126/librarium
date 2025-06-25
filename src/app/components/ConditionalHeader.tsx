"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/src/components/Header/index";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // ヘッダーを非表示にするパスの条件
  const isAuth = pathname === "/auth" || pathname.startsWith("/auth/");
  const isBarcode =
    pathname === "/books/add/barcode" || pathname === "/books/rental/barcode";

  // ヘッダーを表示するかどうか
  const shouldShow = !isAuth && !isBarcode;

  console.log("Current pathname:", pathname, "Should show header:", shouldShow);

  return shouldShow ? <Header /> : null;
}
