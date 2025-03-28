import React from "react";
import style from "./index.module.scss";
import Image from "next/image";

type MenuItem = {
  id: number;
  label: string;
  link: string;
  iconUrl: string;
};

type MenuProps = {
  item: MenuItem;
  onLink: (link: string) => void;
};

export const NavMenu: React.FC<MenuProps> = ({ item, onLink }) => {
  return (
    <li
      onClick={() => onLink(item.link)}
      key={item.id}
      className={`${style.navItem} ${item.id <= 2 ? style.specialClass : ""}`}
    >
      <span>
        <Image
          className={`${style.icon} ${item.id <= 2 ? style.specialIcon : ""}`}
          alt={item.label}
          src={item.iconUrl}
          width={55}
          height={39}
        />
        {item.label}
      </span>
    </li>
  );
};
