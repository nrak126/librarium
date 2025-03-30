"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import styles from "./return.module.scss";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { ReturnBtn } from "./ReturnBtn";
import LoadingBrown from "@/src/components/LoadingBrown";

export const PageClient = () => {
  const searchParams = useSearchParams();
  const returnDate = searchParams.get("returnDate"); // クエリから取得
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 1];

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const renBooks = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${isbn}`
        );
        const data: Book = await renBooks.json();
        setBook(data);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();
  }, [isbn]);

  return (
    <>
      {!book ? (
        <LoadingBrown />
      ) : (
        <div className={styles.contents}>
          {book && <BookInfo book={book} />}
          <p className={styles.Day}>返却期限：{returnDate ?? "不明"}</p>
          <ReturnBtn />
        </div>
      )}
    </>
  );
};
