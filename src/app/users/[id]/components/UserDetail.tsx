"use client";

import styles from "./UsersDetail.module.scss";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import { TagList } from "@/src/components/Users/TagList";
import { TagEdit } from "@/src/components/Users/TagEdit";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/src/components/book/Btn";

export default function UserDetail() {
  const [clickEditer, setClickEditer] = useState(false);
  const router = useRouter();

  const handleSample = () => {
    setClickEditer(!clickEditer);
    console.log(`ClickEdit ${clickEditer}`);
    console.log("編集が押されました。");
  };

  const handleBack = () => {
    console.log("Backが押されました。");
    router.back();
    return;
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
        {clickEditer ? (
          <button onClick={handleSample} className={styles.editbutton}>
            編集
          </button>
        ) : (
          <button onClick={handleSample} className={styles.editbutton}>
            完了
          </button>
        )}
      </div>

      {clickEditer ? <TagList /> : <TagEdit />}

      <div className={clickEditer ? styles.trueexp : styles.falseexp}>
        現在の経験値
      </div>

      <div className={styles.progressbar}>
        <progress max="97" value="50">
          <p>50%</p>
        </progress>
      </div>

      <div className={styles.backbutton}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </div>
  );
}
