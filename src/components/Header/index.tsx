"use client";

import React from "react";
import styles from "./index.module.scss";
import { HamBtn } from "@/src/components/HamBtn";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/Librarium.svg"; // ロゴ画像のパスを適切

export const Header = () => {
  const router = useRouter();
  const link = "/";

  const onHome = (link: string) => {
    router.push(link); // クリック時に指定されたリンクに遷移
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Image
          src={logo}
          alt="HomeIcon"
          width={180}
          height={80}
          onClick={() => onHome(link)}
          className={styles.h1}
        />
        <HamBtn />
      </div>
      <div className={styles.underSpace}></div>
    </div>
  );
};
