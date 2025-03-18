import Image from "next/image";
import React from "react";
import style from "./index.module.scss";
import iconSvg from "@/public/icon.svg"; // ここで直接import

export const NavIcon: React.FC = () => {
  return (
    <div className={style.content}>
      <Image src={iconSvg} alt="icon" width={89} height={89} />
    </div>
  );
};
