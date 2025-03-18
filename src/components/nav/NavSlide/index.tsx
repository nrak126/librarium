"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavIcon } from "../NavIcon";
import "swiper/css"; // Swiper のスタイルをインポート

export const NavSlide: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Swiper
        spaceBetween={70} // アイコン間の隙間
        slidesPerView={3} // 一画面に3つのアイコンを表示
        loop={true} // ループ
        navigation={true} // ナビゲーションボタン
        centeredSlides={true}
      >
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
        <SwiperSlide>
          <NavIcon />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
