"use client";

import { useEffect } from "react";
import style from "../style/return.module.scss";
import { MyData } from "./MyData";
import { supabase } from "@/src/lib/supabase";
import { AllData } from "./AllData";
import { useAtom } from "jotai";
import { rentalAtom } from "@/src/atoms/atoms";

export const Return = () => {
  const [, setRental] = useAtom(rentalAtom);

  // レンタルデータをフェッチする関数
  const fetchRentalData = async () => {
    try {
      const res = await fetch("/api/books/rental");
      const data = await res.json();
      setRental(data);
      localStorage.setItem("rentalBooks", JSON.stringify(data));
    } catch (error) {
      console.error("レンタルデータの取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    // Supabaseのリアルタイム監視を設定
    const channel = supabase
      .channel("realtime-rentals")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rental" }, // rentalテーブルのすべての変更を監視
        (payload) => {
          console.log("Rental data changed:", payload);
          // データが変更されたら再フェッチ
          fetchRentalData();
        }
      )
      .subscribe();

    // クリーンアップ
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRentalData]);

  return (
    <>
      <div className={style.all}>
        <h2 className={style.title}>返却</h2>
        {/* <SearchBar placeholder={"検索"} /> */}
      </div>
      <p className={style.myProfile}>MY RENTAL BOOK</p>
      <MyData />
      <p className={style.allProfile}>ALL RENTAL BOOK</p>
      <AllData />
    </>
  );
};
