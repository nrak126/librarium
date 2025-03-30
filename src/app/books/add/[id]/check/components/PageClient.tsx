"use client";

import styles from "./check.module.scss";
import React, { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { usePathname } from "next/navigation";
import { BookCard } from "@/src/components/book/BookCard";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";

export default function PageClient() {
  const [book, setBook] = useState<Book | null>();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 2];
  const router = useRouter();

  useEffect(() => {
    console.log(isbn);

    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${isbn}`
      );
      const data: Book = await res.json();
      setBook(data);
    })();
  }, [isbn]);

  const handleConfirm = () => {
    router.push("/");
  };

  return (
    <div>
      {book ? (
        <>
          <p className={styles.title}>{book.title}</p>
          <BookCard
            book={book}
            width={150}
            height={180}
            className={styles.card}
          />
          <p className={styles.text}>この本を登録しました！</p>
        </>
      ) : (
        <LoadingBrown />
      )}
      <div className={styles.Btn}>
        <Btn text="ホームに戻る" bgColor="#E2999B" onClick={handleConfirm} />
      </div>
    </div>
  );
}
