"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.scss";
import Icon1 from "@/src/components/HamBtn/Img/rental_side.svg";
import Icon2 from "@/src/components/HamBtn/Img/return_side.svg";
import Icon3 from "@/src/components/HamBtn/Img/user_side.svg";
import Icon4 from "@/src/components/HamBtn/Img/books_side.svg";
import Icon5 from "@/src/components/HamBtn/Img/add_side.svg";
import Image from "next/image";
import userIcon from "@/src/components/HamBtn/Img/fu_icon.jpg";

export const HamBtn: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleMenu = () => setNavOpen(!navOpen);
  const closeMenu = () => setNavOpen(false);
  const navItems = [
    { id: 1, link: "/books/rental", label: "貸出", iconUrl: Icon1 },
    { id: 2, link: "/books/return", label: "返却", iconUrl: Icon2 },
    { id: 3, link: "/users", label: "利用者一覧", iconUrl: Icon3 },
    { id: 4, link: "/books", label: "書籍一覧", iconUrl: Icon4 },
    { id: 5, link: "/books/add", label: "新しい本の登録", iconUrl: Icon5 },
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

  const router = useRouter();

  const onLink = (link: string) => {
    router.push(link); // クリック時に指定されたリンクに遷移
    setNavOpen(!navOpen);
  };

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
        <div className={style.navOll}>
          {navItems.map((item) => (
            <li
              onClick={() => onLink(item.link)}
              key={item.id}
              className={`${style.navItem} ${
                item.id === 1 || item.id === 2 ? style.specialClass : ""
              }`}
            >
              <span>
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
              </span>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};
