import React from "react";
import styles from "./index.module.scss";
import { HamBtn } from "@/src/components/HamBtn";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>Librarium</h1>
      <HamBtn />
      {/* <div className={styles.section} /> */}
    </div>
  );
};
