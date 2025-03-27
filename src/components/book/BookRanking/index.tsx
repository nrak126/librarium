import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
import iphone from "./img.jpg";
const iphoneApps = [
  "iPhoneアプリ開発",
  "iPhoneアプリ開発",
  "iPhoneアプリ開発",
  "iPhoneアプリ開発",
  "iPhoneアプリ開発",
  "iPhoneアプリ開発",
];

export const BookRanking = () => {
  return (
    <div className={style.contents}>
      {iphoneApps.map((appName, index) => {
        // 順位ごとに背景色のクラスを設定
        const rankClass =
          index === 0
            ? style.gold
            : index === 1
            ? style.silver
            : index === 2
            ? style.bronze
            : style.default;

        return (
          <div key={index} className={style.content}>
            <div className={style.card}>
              <div className={`${style.ranking} ${rankClass}`}>
                <div className={style.number}>{index + 1}</div>
              </div>
              <Image
                className={style.image}
                src={iphone}
                alt={appName}
                width={100}
                height={128}
              />
            </div>
            <p className={style.text}>{appName}</p>
          </div>
        );
      })}
    </div>
  );
};
