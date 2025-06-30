import { HomeBook } from "../HomeBook";
import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
import icon from "@/public/rei.svg";
import { Btn } from "../Btn";
export const BookRec = () => {
  const isRecChecked = true; // ここは実際の状態に応じて変更する必要があります

  const handleClick = () => {
    // ここにボタンがクリックされたときの処理を追加
    window.location.href = "/"; // ホームに戻る処理
  };

  const handleBack = () => {
    window.location.href = "/"; // ホームに戻る処理
  };

  return (
    <div>
      {!isRecChecked ? (
        <HomeBook showNumber={false} />
      ) : (
        <>
          <div className={style.noRec}>
            <h3 className={style.title}>おすすめ診断</h3>
            <p className={style.diagText}>
              あなたにおすすめの技術書を診断してみませんか？
            </p>
            <Image
              src={icon}
              alt="診断イメージ"
              width={200}
              height={100}
              className={style.diagImage}
            />
            <p className={style.diagText}>既に興味のある分野がありますか？</p>
          </div>
          <div className={style.btnContainer}>
            <Btn text="はい" bgColor="E2999B" onClick={handleClick} />
            <Btn text="いいえ" bgColor="#99C6E2" onClick={handleBack} />
          </div>
        </>
      )}
    </div>
  );
};
