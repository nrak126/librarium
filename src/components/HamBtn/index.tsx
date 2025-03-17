import React, { useState } from "react";
import style from "./index.module.scss";

export const HamBtn: React.FC = () => {
  const [navOpen, setnavOpen] = useState(false);
  const toggleMenu = () => setnavOpen(!navOpen);

  const navItems = [
    { href: "#rental", label: "貸出" },
    { href: "#return", label: "返却" },
    { href: "#user", label: "利用者一覧" },
    { href: "#book", label: "書籍一覧" },
    { href: "#add", label: "新しい本の登録" },
  ];

  return (
    <nav>
      <div
        className={`${style.menuToggle} ${navOpen ? style.active : ""}`}
        onClick={toggleMenu}
      >
        <div className={style.bar}></div>
        <div className={style.bar}></div>
        <div className={style.bar}></div>
      </div>

      {/* メニューアイテムの表示 */}

      <ul className={`${style.navItems} ${navOpen ? style.show : ""}`}>
        {navItems.map((item, index) => (
          <li key={index} className={style.navItem}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
