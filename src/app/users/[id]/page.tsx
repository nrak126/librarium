"use client";

import styles from "./UsersIdPage.module.scss";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import { TagList } from "@/src/components/Users/TagList";

export default function Page() {
  const handleSample = () => {
    console.log("編集が押されました。");
  };

  return (
    <div className={styles.whole}>
      <Image
        src={Icon}
        alt={"ユーザーのアイコン"}
        width={180}
        height={180}
        className={styles.icon}
        priority
      />

      <div className={styles.username}>k24142 矢部 大智</div>

      <div className={styles.tagediter}>
        <div className={styles.tag}>タグ</div>
        <button onClick={handleSample} className={styles.editbutton}>
          編集
        </button>
      </div>

      <TagList />

      <div className={styles.exp}>現在の経験値</div>
    </div>
  );
}
