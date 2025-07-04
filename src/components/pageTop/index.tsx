"use client";

import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./index.module.scss";
import Image from "next/image";
import before from "@/public/libea_top.svg";
import after from "@/public/libea_ba.svg";

export const PageTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIcon, setIcon] = useState(false);

  // スクロール位置を監視
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIcon(false); // スクロールが上に戻った時にアイコンもリセット
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // トップにスクロールする関数
  const scrollToTop = () => {
    setIcon(true);
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  return (
    <>
      {isVisible && (
        <div>
          {isIcon ? (
            <Image
              className={styles.pageTopButton}
              onClick={scrollToTop}
              src={after}
              width={100}
              height={100}
              alt="topアイコン（押された後）"
            />
          ) : (
            <Image
              className={styles.pageTopButton}
              onClick={scrollToTop}
              src={before}
              width={100}
              height={100}
              alt="topアイコン（押される前）"
            />
          )}
        </div>
      )}
    </>
  );
};
