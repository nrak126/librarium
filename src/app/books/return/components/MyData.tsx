"use client";

import Image from "next/image";
import style from "../style/return.module.scss";
import Icon from "../icon/fu_icon.jpg";
import BookIcon from "../icon/img.jpg";

export const MyData = () => {
  return (
    <div>
      <div className={style.contents}>
        <div className={style.content}>
          <Image
            src={Icon}
            alt={"librariumのアイコン"}
            width={57}
            height={57}
            className={style.icon}
          />
          <div className={style.text}>
            <p className={style.bookName}>Iphone開発アプリ</p>
            <p className={style.return}>
              返却期限：<span className={style.returnTime}>2025/99/99</span>
            </p>
            <p className={style.userName}>k24142 矢部大智</p>
          </div>
          <Image
            src={BookIcon}
            alt={"librariumのアイコン"}
            width={60}
            height={90}
            className={style.BookIcon}
          />
        </div>
      </div>
    </div>
  );
};
