import Image from "next/image";
import React from "react";
import style from "./index.module.scss";

interface NavIconProps {
  name: string;
  iconUrl: string;
}

export const NavIcon: React.FC<NavIconProps> = (props) => {
  const { name, iconUrl } = props;

  return (
    <div className={style.content}>
      <Image
        className={style.icon}
        src={iconUrl}
        alt={name}
        width={89}
        height={89}
        unoptimized
      />
      <p className={style.name}>{name}</p>
    </div>
  );
};
