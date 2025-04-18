"use client";

import Image from "next/image";
import style from "../style/return.module.scss";
import { useEffect, useState } from "react";
import { RentalList } from "../../../../types";
import { supabase } from "@/src/lib/supabase";
import LoadingBrown from "@/src/components/LoadingBrown";

export const AllData = () => {
  const [rental, setRental] = useState<RentalList[]>([]);

  useEffect(() => {
    // レンタルデータの取得
    (async () => {
      try {
        const renBooks = await fetch(`/api/loans/rentalList`);
        const data: RentalList[] = await renBooks.json();
        setRental(data);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();

    // ログイン中のユーザー情報の取得
    (async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        return <h1>ユーザ情報を取得できませんでした。</h1>;
      }
    })();
  }, []);

  // 返却日を「あと〇日」形式に変換する関数

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = new Date(returnDate); // 返却日の日付
    returnDateObj.setHours(0, 0, 0, 0);

    // YYYY/M/D の形式に整形
    const year = returnDateObj.getFullYear();
    const month = returnDateObj.getMonth() + 1;
    const day = returnDateObj.getDate();

    return `${year}/${month}/${day}`;
  };

  return (
    <div>
      {rental ? (
        <div className={style.contents}>
          {rental.filter((book) => !book.isReturned).length === 0 ? (
            <p className={style.noRental}>貸し出し中の本はありません</p>
          ) : (
            rental
              .filter((book) => !book.isReturned)
              .map((book) => (
                <div key={book.id} className={style.content}>
                  <Image
                    src={book.users.icon}
                    alt="librariumのアイコン"
                    width={57}
                    height={57}
                    className={style.icon}
                  />
                  <div className={style.text}>
                    <p className={style.bookName}>{book.books.title}</p>
                    <p className={style.return}>
                      返却期限：
                      <span className={style.returnTime}>
                        {getReturnDay(book.return_date)}
                      </span>
                    </p>
                    <p
                      className={style.usersName}
                    >{`${book.users.studentId}　${book.users.name}`}</p>
                  </div>
                  <Image
                    src={book.books.thumbnail}
                    alt="librariumの本のアイコン"
                    width={60}
                    height={90}
                    className={style.BookIcon}
                  />
                </div>
              ))
          )}
        </div>
      ) : (
        <LoadingBrown />
      )}
    </div>
  );
};
