"use client";

import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./index.module.scss";
import Image from "next/image";
import before from "@/public/topkuma.svg";
import after from "@/public/libea_ba.svg";

export const PageTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIcon, setIcon] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // スクロール位置を監視
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        if (!shouldShow) {
          setShouldShow(true);
          setTimeout(() => setIsVisible(true), 100);
        } else if (!isVisible) {
          // スライドアウト中に下にスクロールした場合、すぐに表示
          setIsVisible(true);
        }
      } else {
        if (shouldShow && isVisible) {
          setIsVisible(false);
          setTimeout(() => {
            setShouldShow(false);
            setIcon(false);
          }, 600);
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [shouldShow, isVisible]);

  // トップにスクロールする関数
  const scrollToTop = () => {
    setIcon(true);
    scroll.scrollToTop({
      duration: 1000, // 500ms → 800msに変更（より遅く）
      smooth: "easeInOutQuart", // 緩急をつけたイージング
    });

    // 1.5秒後にアイコンを元に戻す
    setTimeout(() => {
      setIcon(false);
    }, 1500);
  };

  return (
    <>
      {shouldShow && (
        <div
          className={`${styles.pageTopContainer} ${
            isVisible ? styles.slideIn : styles.slideOut
          }`}
        >
          {isIcon ? (
            <div className={`${styles.pageTopButton} ${styles.large}`}>
              <Image
                onClick={scrollToTop}
                src={after}
                width={120}
                height={160}
                alt="topアイコン（押された後）"
                priority
              />
            </div>
          ) : (
            <div className={`${styles.pageTopButton} ${styles.normal}`}>
              <Image
                onClick={scrollToTop}
                src={before}
                width={80}
                height={80}
                alt="topアイコン（押される前）"
                priority
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
