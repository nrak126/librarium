"use client";

import React from "react";
import styles from "./index.module.scss";
import { HamBtn } from "@/src/components/HamBtn";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Librarium.svg"; // ロゴ画像のパスを適切
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const isBarcodePage = pathname.includes("/barcode");

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link href="/">
          <Image
            src={logo}
            alt="HomeIcon"
            width={180}
            height={80}
            className={styles.h1}
          />
        </Link>
        <HamBtn />
      </div>
      {!isBarcodePage && <div className={styles.underSpace}></div>}
    </div>
  );
};
