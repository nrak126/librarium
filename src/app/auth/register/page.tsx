"use client";
import { useState } from "react";
import Icon from "@/public/icon.svg";
import styles from "./register.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [enter, setEnter] = useState(false);
  const router = useRouter();

  const conectTop = async () => {
    router.push("/");
  };

  const handleEnter = () => {
    setEnter(true);
    console.log("useState", enter);
    conectTop();
  };

  return (
    <div className={styles.whole}>
      <Image
        src={Icon}
        alt={"librariumのアイコン"}
        width={230}
        height={230}
        className={styles.icon}
      />

      <div className={styles.formName}>
        <label className={styles.name}>氏名</label>
        <input className={styles.inputName} type="text"></input>
      </div>

      <div className={styles.formNum}>
        <label className={styles.number}>学籍番号</label>
        <input className={styles.inputNum} type="text"></input>
      </div>

      <button className={styles.btn} onClick={handleEnter}>
        決定
      </button>
    </div>
  );
}
