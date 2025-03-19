import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Icon1 from "@/src/components/HamBtn/Img/rental_side.svg";
import Icon2 from "@/src/components/HamBtn/Img/return_side.svg";
import Icon3 from "@/src/components/HamBtn/Img/user_side.svg";
import Icon4 from "@/src/components/HamBtn/Img/books_side.svg";
import Icon5 from "@/src/components/HamBtn/Img/add_side.svg";
import Image from "next/image";

export const HamBtn: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleMenu = () => setNavOpen(!navOpen);
  const closeMenu = () => setNavOpen(false);
  const navItems = [
    { id: 1, href: "#rental", label: "貸出", iconUrl: Icon1 },
    { id: 2, href: "#return", label: "返却", iconUrl: Icon2 },
    { id: 3, href: "#user", label: "利用者一覧", iconUrl: Icon3 },
    { id: 4, href: "#book", label: "書籍一覧", iconUrl: Icon4 },
    { id: 5, href: "#add", label: "新しい本の登録", iconUrl: Icon5 },
  ];
  // ナビの開閉時に body のスクロールを制御
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden"; // スクロールを防ぐ
    } else {
      document.body.style.overflow = ""; // スクロールを元に戻す
    }
    return () => {
      document.body.style.overflow = ""; // コンポーネントがアンマウントされたら元に戻す
    };
  }, [navOpen]);

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

      {/* オーバーレイ */}
      <div
        className={`${style.overlay} ${navOpen ? style.show : ""}`}
        onClick={closeMenu} // クリックでメニューを閉じる
      ></div>

      {/* メニューアイテムの表示 */}

      <ul className={`${style.navItems} ${navOpen ? style.show : ""}`}>
        <div className={style.circle}>
          <div className={style.circle1}>
            <div className={style.circle2}></div>
          </div>
        </div>
        <div className={style.navOll}>
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`${style.navItem} ${
                item.id === 1 || item.id === 2 ? style.specialClass : ""
              }`}
            >
              <a href={item.href}>
                <Image
                  className={`${style.icon} ${
                    item.id === 1 || item.id === 2 ? style.specialIcon : ""
                  }`}
                  alt={item.label}
                  src={item.iconUrl}
                  width={55}
                  height={39}
                />
                {item.label}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};
