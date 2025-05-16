"use client";

import Image from "next/image";
import style from "../style/return.module.scss";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// types.ts などに
export type Rental = {
  id: string;
  users: {
    id: string;
    icon: string;
    studentId: string;
    name: string;
  };
  books: {
    isbn: string;
    title: string;
    thumbnail: string;
  };
  return_date: string;
  isReturned: boolean;
};

// ✅ Rental の配列にする
export type RentalList = Rental[];

export const MyData = () => {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const [rental, SetRental] = useState<RentalList>();

  useEffect(() => {
    const rentalBooks = localStorage.getItem("rentalBooks");
    if (rentalBooks) {
      const parsed: RentalList = JSON.parse(rentalBooks);
      SetRental(parsed);
      return;
    }

    (async () => {
      const res = await fetch(`/api/books/rental`);
      const data = await res.json();
      SetRental(data);
      localStorage.setItem(`rentalBooks`, JSON.stringify(data));
    })();
  }, []);

  // ユーザーID取得（localStorageから）
  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.id) setUserId(parsed.id);
      } catch (e) {
        console.error("loginUser JSON parse error:", e);
      }
    }
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

  if (!rental) {
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <div className={style.contents}>
        {rental &&
        rental.filter(
          (book) => book.users.id === userId && book.isReturned === false
        ).length === 0 ? (
          <p className={style.noRental}>貸し出し中の本はありません</p>
        ) : (
          rental
            ?.filter(
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
                  <p className={style.userName}>
                    {`${book.users.studentId}　${book.users.name}`}
                  </p>
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
