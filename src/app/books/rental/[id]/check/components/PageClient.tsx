"use client";

import styles from "./check.module.scss";
import React, { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { usePathname, useSearchParams } from "next/navigation";
import { BookCard } from "@/src/components/book/BookCard";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";

export default function PageClient() {
  const [book, setBook] = useState<Book | null>();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 2];
  const router = useRouter();
  const seachParams = useSearchParams();
  const loanPeriodStr = seachParams.get("q") || "";
  const loanPeriod = Number(loanPeriodStr);
  const [books] = useAtom(booksAtom);

  // 本のデータ取得（キャッシュ優先）
  useEffect(() => {
    const cached = books?.find((book) => book.isbn === isbn);
    setBook(cached || null);
  }, [isbn, books]);

  const handleConfirm = () => {
    router.push("/");
  };

  const today = new Date(loanPeriod);

  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${year}/${month}/${day}`;

  return (
    <div className={styles.content}>
      {book ? (
        <>
          <p className={styles.title}>{book.title}</p>
          <div className={styles.author}>
            <BookCard
              book={book}
              width={150}
              height={180}
              className={styles.card}
            />
          </div>
          <p className={styles.Day}>返却期限： {date}</p>
        </>
      ) : (
        <LoadingBrown />
      )}
      <div className={styles.Btn}>
        <Btn text="確認した" bgColor="#E2999B" onClick={handleConfirm} />
      </div>
    </div>
  );
}
