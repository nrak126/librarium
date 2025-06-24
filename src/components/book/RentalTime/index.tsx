"use client";

import React, { useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";

import { useRouter } from "next/navigation";
import LoadingBrown from "../../LoadingBrown";
import { useAtom } from "jotai";
import { logedInUserAtom, rentalAtom } from "@/src/atoms/atoms";
import dayjs from "dayjs";

export const RentalTime: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rentals] = useAtom(rentalAtom); // useAtom を使用
  const [loginUser] = useAtom(logedInUserAtom); // ログインユーザーを取得

  const router = useRouter();

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

  const getUserRentalBooks = () => {
    if (!rentals || !loginUser?.uid) return [];

    return rentals.filter(
      (rental) =>
        rental.users.id === loginUser.uid && rental.isReturned === false
    );
  };

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = dayjs(returnDate);

    return returnDateObj.format("YYYY/MM/DD");
  };

  const onLink = (isbn: string, returnDate: string, loanId: string) => {
    try {
      setLoading(true);
      const formattedDate = getReturnDay(returnDate); // YYYY/M/D に変換
      router.push(
        `books/return/${isbn}?returnDate=${encodeURIComponent(
          formattedDate
        )}&loanId=${loanId}`
      );
    } catch {
      <p>失敗</p>;
    }
  };

  const userRentalBooks = getUserRentalBooks();
  return loading ? (
    <div className={style.loading}>
      <LoadingBrown />
    </div>
  ) : (
    <div>
      <div className={style.contents}>
        {userRentalBooks.length === 0 ? (
          <p className={style.noRental}>貸し出し中の本はありません</p>
        ) : (
          rentals
            ?.filter(
              (rental) =>
                rental.users.id === loginUser?.uid &&
                rental.isReturned === false
            )
            .map((rental) => (
              <div
                key={rental.id}
                className={style.content}
                onClick={() =>
                  onLink(rental.books.isbn, rental.return_date, rental.id)
                }
              >
                <div className={style.main}>
                  <Image
                    className={style.img}
                    src={rental.books.thumbnail} // 本のサムネイルを表示
                    width={90}
                    height={130}
                    alt={rental.books.title} // 本のタイトルをaltに
                  />
                </div>

                <div className={style.text}>
                  <p className={style.bookName}>{rental.books.title}</p>
                  <p
                    className={`${style.return} ${
                      getRemainingDays(rental.return_date).includes("期限切れ")
                        ? style.expiredDay
                        : ""
                    }`}
                  >
                    返却期限：
                    <span className={style.returnTime}>
                      {getReturnDay(rental.return_date)} {/* 返却期限を表示 */}
                    </span>
                  </p>
                  <p
                    className={`${style.day} ${
                      getRemainingDays(rental.return_date).includes("期限切れ")
                        ? style.expired
                        : getRemainingDays(rental.return_date).includes("本日")
                        ? style.dueToday
                        : ""
                    }`}
                  >
                    {getRemainingDays(rental.return_date)}{" "}
                    {/* 残り日数を表示 */}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
