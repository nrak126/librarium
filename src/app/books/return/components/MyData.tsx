"use client";

import Image from "next/image";
import style from "../style/return.module.scss";

import { RentalList } from "../../../../types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

export const MyData = () => {
  const [rental, setRental] = useState<RentalList[]>([]);
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    // レンタルデータの取得
    (async () => {
      try {
        const renBooks = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/loans/rentalList`
        );
        const data: RentalList[] = await renBooks.json();
        setRental(data);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();

    // ログイン中のユーザー情報の取得
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return <h1>ユーザ情報を取得できませんでした。</h1>;
      }
      if (data) {
        setUserId(data.user.id); // 現在のユーザーIDをセット
      }
    })();
  }, []);

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
    const formattedDate = getReturnDay(returnDate); // YYYY/M/D に変換
    router.push(
      `./return/${isbn}?returnDate=${encodeURIComponent(formattedDate)}`
    );
  };

  return (
    <div>
      <div className={style.contents}>
        {rental.filter(
          (book) => book.users.id === userId && book.isReturned === false
        ).length === 0 ? ( // user.idが一致しないアイテムをフィルタリング
          <p className={style.noRental}>貸し出し中の本はありません</p> // フィルタ結果が空の場合にメッセージ表示
        ) : (
          rental
            .filter(
              (book) => book.users.id === userId && book.isReturned === false
            )
            .map((book) => (
              <div
                key={book.id}
                className={style.content}
                onClick={() => onLink(book.books.isbn, book.return_date)} // 返却日も渡す
              >
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
                    className={style.userName}
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
    </div>
  );
};
