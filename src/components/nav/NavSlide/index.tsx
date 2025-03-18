"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavIcon } from "../NavIcon";
import "swiper/css";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import "./index.scss"; // 追加したスタイルをインポート

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
