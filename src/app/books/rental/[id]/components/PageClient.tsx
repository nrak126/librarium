"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import { Book } from "@/src/types";
import { RentBtn } from "./RentBtn";
import { LoanPeriod } from "./LoanPeriod";
import { useEffect, useState } from "react";

export default function PageClient({ id }: { id: string }) {
  const [book, setBook] = useState<Book>();
  const [loanPeriod, setLoanPeriod] = useState<number>(0);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // APIから本の情報を取得
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch book");
        }

        const bookData: Book = await res.json();
        setBook(bookData);
      } catch (error) {
        console.error("本の情報の取得に失敗しました:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // bookがnullの場合はローディング表示
  if (!book) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <BookInfo book={book} />
      <LoanPeriod setLoanPeriod={setLoanPeriod} />
      <RentBtn book={book} loanPeriod={loanPeriod} />
    </>
  );
}
