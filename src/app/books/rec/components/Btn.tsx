"use client";
import style from "../style/index.module.scss";
import { Btn } from "@/src/components/book/Btn";

export const RecBtn = () => {
  const handleClick = () => {
    // Handle the button click to show results
    console.log("診断結果を見るボタンがクリックされました");
  };
  return (
    <div className={style.btnContainer}>
      <Btn text="診断結果を見る" bgColor="#E2999B" onClick={handleClick} />
      <Btn text="戻る" bgColor="#99C6E2" onClick={handleClick} />
    </div>
  );
};
