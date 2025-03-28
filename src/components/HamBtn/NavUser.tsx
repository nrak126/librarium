"use client";

import React from "react";
import userIcon from "@/src/components/HamBtn/Img/fu_icon.jpg";
import Image from "next/image";
import style from "./index.module.scss";

export const NavUser: React.FC = () => {
  return (
    <div className={style.circle}>
      <div className={style.circle1}>
        <div className={style.circle2}>
          <div className={style.user}>
            <Image
              className={style.userIcon}
              alt={"user"}
              src={userIcon}
              width={70}
              height={70}
            />
            <p className={style.userName}>k24142矢部大地</p>
            {/* あとでプロップス */}
          </div>
        </div>
      </div>
    </div>
  );
};
