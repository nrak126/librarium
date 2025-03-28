"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.scss";
import { navItems } from "@/src/components/HamBtn/NavList";
import { NavUser } from "./NavUser";
import { NavMenu } from "./NavMenu";

export const HamBtn: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleMenu = () => setNavOpen(!navOpen);
  const closeMenu = () => setNavOpen(false);

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

      <ul className={`${style.navItems} ${navOpen ? style.show : ""}`}>
        {/* // ユーザープロフィールコンポーネントの表示 */}
        <NavUser />
        <div className={style.navOll}>
          {navItems.map((item) => (
            <NavMenu key={item.id} item={item} onLink={onLink} />
          ))}
        </div>
      </ul>
    </nav>
  );
};
