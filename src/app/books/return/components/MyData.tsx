"use client";

import style from "../style/return.module.scss";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";
import { RentalBookItem } from "./RentalBook";

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
  const router = useRouter();
  const [rental, SetRental] = useState<RentalList>();
  const [loginUser] = useAtom(logedInUserAtom);

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

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = dayjs(returnDate);

    return returnDateObj.format("YYYY/MM/DD");
  };

  const getUserRentalBooks = () => {
    if (!rental || !loginUser?.uid) return [];

    return rental.filter(
      (book) => book.users.id === loginUser.uid && book.isReturned === false
    );
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

  const userRentalBooks = getUserRentalBooks();

  return (
    <div>
      <div className={style.contents}>
        {userRentalBooks.length === 0 ? (
          <p className={style.noRental}>貸し出し中の本はありません</p>
        ) : (
          userRentalBooks.map((book) => (
            <RentalBookItem
              key={book.id}
              book={book}
              onLink={onLink}
              getReturnDay={getReturnDay}
            />
          ))
        )}
      </div>
    </div>
  );
};
