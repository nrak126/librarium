import { HomeBook } from "../HomeBook";
import React from "react";
import style from "./index.module.scss";

export const BookRec = () => {
  const isRecChecked = true; // ここは実際の状態に応じて変更する必要があります
  return (
    <div>
      {!isRecChecked ? (
        <HomeBook showNumber={false} />
      ) : (
        <div className={style.noRec}>
          <h3 className={style.title}>おすすめ診断</h3>
          <p>あなたにおすすめの技術書を診断してみませんか？</p>
        </div>
      )}
    </div>
  );
};
