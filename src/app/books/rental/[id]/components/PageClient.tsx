"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import { Book } from "@/src/types";
import { RentBtn } from "./RentBtn";
import { LoanPeriod } from "./LoanPeriod";
import { useEffect, useState } from "react";
import LoadingBrown from "@/src/components/LoadingBrown";
import styles from "./index.module.scss";
import Link from "next/link";

export default function PageClient({ id }: { id: string }) {
  const [book, setBook] = useState<Book>();
  const [loanPeriod, setLoanPeriod] = useState<number>(0);
  const [, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

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

        const bookData: Book = await res.json();

        // 空のオブジェクトや不正なデータをチェック
        if (!bookData || !bookData.isbn || Object.keys(bookData).length === 0) {
          setNotFound(true);
          return;
        }

        setBook(bookData);
      } catch (error) {
        console.error("本の情報の取得に失敗しました:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (notFound) {
    return (
      <div className={styles.container}>
        <h2 className={styles.subtitle}>
          借りようとしている本が見つかりません
        </h2>
        <p className={styles.description}>
          申し訳ありませんが、本が登録されていないか、
          <br />
          isbnが間違っている可能性があります。
        </p>
        <Link href="/" className={styles.link}>
          ホームに戻る
        </Link>
      </div>
    );
  }

  // bookがnullの場合はローディング表示
  if (!book) {
    return <LoadingBrown />;
  }

  return (
    <>
      <BookInfo book={book} />
      <p className={styles.Text}>貸出期限</p>
      <LoanPeriod setLoanPeriod={setLoanPeriod} setError={setError} />
      <RentBtn book={book} loanPeriod={loanPeriod} />
    </>
  );
}
