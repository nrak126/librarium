"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavIcon } from "../NavIcon";
import "swiper/css";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import "./index.scss";

import Icon1 from "@/src/components/nav/NavIcon/Img/rental.svg";
import Icon2 from "@/src/components/nav/NavIcon/Img/return.svg";
import Icon3 from "@/src/components/nav/NavIcon/Img/user.svg";
import Icon4 from "@/src/components/nav/NavIcon/Img/books.svg";
import Icon5 from "@/src/components/nav/NavIcon/Img/add.svg";

const iconData = [
  {
    id: 1,
    name: "貸出",
    iconUrl: Icon1,
  },
  { id: 2, name: "返却", iconUrl: Icon2 },
  { id: 3, name: "利用者一覧", iconUrl: Icon3 },
  { id: 4, name: "書籍一覧", iconUrl: Icon4 },
  { id: 5, name: "新しい本の追加", iconUrl: Icon5 },
];

export const NavSlide: React.FC = () => {
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
            <NavIcon name={icon.name} iconUrl={icon.iconUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
