"use client";

import Image from "next/image";
import style from "../style/return.module.scss";
import LoadingBrown from "@/src/components/LoadingBrown";
import { useAtom } from "jotai";
import { rentalAtom } from "@/src/atoms/atoms";
import { useEffect } from "react";
import { RentalList } from "@/src/types";

export const AllData = () => {
  const [rental, setRental] = useAtom(rentalAtom);

  useEffect(() => {
    (async () => {
      if (!rental) {
        const usersRes = await fetch(`/api/books/rental`);
        // ステータス確認
        if (!usersRes.ok) {
          console.error("Fetch failed:", usersRes.status);
          return;
        }

        const rentalBook: RentalList[] = await usersRes.json();
        setRental(rentalBook);
      }
    })();
  }, [rental, setRental]);


  //日付超過を確認
  const isOverdue = (returnDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const returnDateObj = new Date(returnDate);
    returnDateObj.setHours(0, 0, 0, 0);

    return returnDateObj < today;
  };

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
                      <span
                        className={`${style.returnTime} ${
                          isOverdue(book.return_date) ? style.overdue : ""
                        }`}
                      >
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
