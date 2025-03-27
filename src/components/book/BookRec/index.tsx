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

export const BookRec = () => {
  return (
    <div className={style.contents}>
      {iphoneApps.map((appName, index) => (
        <div key={index} className={style.content}>
          <div className={style.card}>
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
      ))}
    </div>
  );
};
