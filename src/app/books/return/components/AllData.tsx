"use client";

import Image from "next/image";
import style from "../style/return.module.scss";
import Icon from "../icon/fu_icon.jpg";
import BookIcon from "../icon/img.jpg";
import { useEffect, useState } from "react";
import { Loan } from "../../../../types";

export const AllData = () => {
  const [rental, setRental] = useState<Loan[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const renBooks = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/loans`
        );
        const data: Loan[] = await renBooks.json();
        setRental(data);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();
  }, []);

  // 返却日を「あと〇日」形式に変換する関数
  const getRemainingDays = (returnDate: string) => {
    if (!returnDate) return "不明";

    const returnDateObj = new Date(returnDate); //返却日の日付
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間をリセット
    returnDateObj.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (returnDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0) {
      return `あと${diffDays}日`;
    } else if (diffDays === 0) {
      return "今日が返却日";
    } else {
      return `期限切れ`;
    }
  };

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = new Date(returnDate); //返却日の日付
    returnDateObj.setHours(0, 0, 0, 0);

    // YYYY/M/D の形式に整形
    const year = returnDateObj.getFullYear();
    const month = returnDateObj.getMonth() + 1;
    const day = returnDateObj.getDate();

    return `${year}/${month}/${day}`;
  };

  return (
    <div>
      <div className={style.contents}>
        {rental.map((book) => (
          <div key={book.id} className={style.content}>
            <Image
              src={Icon}
              alt="librariumのアイコン"
              width={57}
              height={57}
              className={style.icon}
            />
            <div className={style.text}>
              <p className={style.bookName}>例です</p>
              <p className={style.return}>
                返却期限：
                <span className={style.returnTime}>
                  {getReturnDay(book.return_date)}
                </span>
              </p>
              <p className={style.userName}>
                {getRemainingDays(book.return_date)}
              </p>
            </div>
            <Image
              src={BookIcon}
              alt="librariumの本のアイコン"
              width={60}
              height={90}
              className={style.BookIcon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
