"use client";

import React from "react";
import styles from "./index.module.scss";
import { HamBtn } from "@/src/components/HamBtn";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const link = "/";

  const onHome = (link: string) => {
    router.push(link); // クリック時に指定されたリンクに遷移
  };
  return (
    <div className={styles.header}>
      <h1 onClick={() => onHome(link)} className={styles.h1}>
        Librarium
      </h1>
      <HamBtn />
      {/* <div className={styles.section} /> */}
    </div>
  );
};
