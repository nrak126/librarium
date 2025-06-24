"use client";

import style from "../style/return.module.scss";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { logedInUserAtom, rentalAtom } from "@/src/atoms/atoms";
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
  const [rental] = useAtom(rentalAtom);
  const [loginUser] = useAtom(logedInUserAtom);

  const getReturnDay = (returnDate: string) => {
    const returnDateObj = dayjs(returnDate);
    const returnData = returnDateObj.format("YYYY/MM/DD");
    return returnData;
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
