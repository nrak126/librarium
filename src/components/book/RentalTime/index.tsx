"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";

import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import LoadingBrown from "../../LoadingBrown";
import { RentalList } from "@/src/types";

export const RentalTime: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rental, setRental] = useState<RentalList[]>([]);

  const router = useRouter();

  // 初回マウント時に localStorage から読み込む
  useEffect(() => {
    const json = localStorage.getItem("rentalBooks");
    if (json) {
      try {
        const parsed = JSON.parse(json);
        setRental(parsed);
      } catch (e) {
        console.error("rentalBooks JSON parse error:", e);
      }
    }
  }, []);
  useEffect(() => {
    const json = localStorage.getItem("loginUser");
    if (json) {
      try {
        const parsed = JSON.parse(json);
        setUserId(parsed.id); // ここは保存しているuserオブジェクトのidに合わせて調整
      } catch (e) {
        console.error("loginUser JSON parse error:", e);
      }
    } else {
      // localStorageにない場合はSupabaseから取るのもあり
      (async () => {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          setUserId(data.user.id);
          // localStorageにも保存しておく
          localStorage.setItem("loginUser", JSON.stringify(data));
        }
      })();
    }
  }, []);

  // 返却日を「あと〇日」形式に変換する関数
  const getRemainingDays = (returnDate: string) => {
    if (!returnDate) return "不明";

    const returnDateObj = new Date(returnDate); // 返却日の日付
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間をリセット
    returnDateObj.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (returnDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0) {
      return `あと${diffDays}日`;
    } else if (diffDays === 0) {
      return "本日";
    } else {
      return `期限切れ`;
    }
  };

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = new Date(returnDate); // 返却日の日付
    returnDateObj.setHours(0, 0, 0, 0);

    // YYYY/M/D の形式に整形
    const year = returnDateObj.getFullYear();
    const month = returnDateObj.getMonth() + 1;
    const day = returnDateObj.getDate();

    return `${year}/${month}/${day}`;
  };
  const onLink = (isbn: string, returnDate: string) => {
    try {
      setLoading(true);
      const formattedDate = getReturnDay(returnDate); // YYYY/M/D に変換
      router.push(
        `books/return/${isbn}?returnDate=${encodeURIComponent(formattedDate)}`
      );
    } catch {
      <p>失敗</p>;
    }
  };

  return loading ? (
    <div className={style.loading}>
      <LoadingBrown />
    </div>
  ) : (
    <div>
      <div className={style.contents}>
        {rental?.filter(
          (book) => book.users.id === userId && book.isReturned === false
        ).length === 0 ? ( // user.idが一致しないアイテムをフィルタリング
          <p className={style.noRental}>貸し出し中の本はありません</p> // フィルタ結果が空の場合にメッセージ表示
        ) : (
          rental
            ?.filter(
              (book) => book.users.id === userId && book.isReturned === false
            )
            .map((book) => (
              <div
                key={book.id}
                className={style.content}
                onClick={() => onLink(book.books.isbn, book.return_date)}
              >
                <div className={style.main}>
                  <Image
                    className={style.img}
                    src={book.books.thumbnail} // 本のサムネイルを表示
                    width={90}
                    height={130}
                    alt={book.books.title} // 本のタイトルをaltに
                  />
                </div>

                <div className={style.text}>
                  <p className={style.bookName}>{book.books.title}</p>
                  <p
                    className={`${style.return} ${
                      getRemainingDays(book.return_date).includes("期限切れ")
                        ? style.expiredDay
                        : ""
                    }`}
                  >
                    返却期限：
                    <span className={style.returnTime}>
                      {getReturnDay(book.return_date)} {/* 返却期限を表示 */}
                    </span>
                  </p>
                  <p
                    className={`${style.day} ${
                      getRemainingDays(book.return_date).includes("期限切れ")
                        ? style.expired
                        : getRemainingDays(book.return_date).includes("本日")
                        ? style.dueToday
                        : ""
                    }`}
                  >
                    {getRemainingDays(book.return_date)} {/* 残り日数を表示 */}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
