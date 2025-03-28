"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavIcon } from "../NavIcon";
import "swiper/css";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import "./index.scss";
import { useRouter } from "next/navigation";

import Icon1 from "@/src/components/nav/NavIcon/Img/rental.svg";
import Icon2 from "@/src/components/nav/NavIcon/Img/return.svg";
import Icon3 from "@/src/components/nav/NavIcon/Img/user.svg";
import Icon4 from "@/src/components/nav/NavIcon/Img/books.svg";
import Icon5 from "@/src/components/nav/NavIcon/Img/add.svg";

const iconData = [
  { id: 1, name: "貸出", iconUrl: Icon1, link: "/books/rental/barcode" },
  { id: 2, name: "返却", iconUrl: Icon2, link: "/books/return" },
  { id: 3, name: "利用者一覧", iconUrl: Icon3, link: "/users" },
  { id: 4, name: "書籍一覧", iconUrl: Icon4, link: "/books" },
  { id: 5, name: "新しい本の追加", iconUrl: Icon5, link: "/books/add/barcode" },
];

export const NavSlide: React.FC = () => {
  const router = useRouter();

  const onLink = (link: string) => {
    router.push(link); // クリック時に指定されたリンクに遷移
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Swiper
        className="swiper-container"
        spaceBetween={15} // アイコン間の隙間
        slidesPerView={2.5} // 一画面に2.5つのアイコンを表示
        loop={true} // ループ
        navigation={true} // ナビゲーションボタン
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
      >
        {iconData.map((icon) => (
          <SwiperSlide key={icon.id}>
            <div onClick={() => onLink(icon.link)}>
              <NavIcon name={icon.name} iconUrl={icon.iconUrl} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
