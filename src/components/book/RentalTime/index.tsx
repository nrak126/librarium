import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
import ipone from "./img.jpg";

export const  RentalTime = () => {
  return (
    <div className={style.content}>
      <div className={style.main}>
        <Image
          className={style.img}
          src={ipone}
          width={100}
          height={150}
          alt={"aaa"}
        />
      </div>

      <div className={style.text}>
        <p className={style.bookName}>Iphone開発アプリ</p>
        <p className={style.return}>
          返却期限：<span className={style.returnTime}>2025/99/99</span>
        </p>
        <p className={style.day}>あと3日</p>
      </div>
    </div>
  );
};
