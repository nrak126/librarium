import Image from "next/image";
import React from "react";
import style from "./index.module.scss";
import iconSvg from "@/src/components/nav/NavIcon/Img/rental.svg";

export const NavIcon: React.FC = () => {
  return (
    <div className={style.content}>
      <Image
        className={style.icon}
        src={iconSvg}
        alt="icon"
        width={89}
        height={89}
        unoptimized
      />
      <p className={style.name}>貸出</p>
    </div>
  );
};
