"use client";

import styles from "../check.module.scss";
import React, { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { usePathname } from "next/navigation";
import { BookCard } from "@/src/components/book/BookCard";

export default function PageClient() {
  const [book, setBook] = useState<Book | null>();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 2];

  useEffect(() => {
    console.log(isbn);

    const fetchBook = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${isbn}`
      );
      const data: Book = await res.json();
      setBook(data);
    };
    fetchBook();
  }, [isbn]);

  return (
    <div>
      {book ? (
        <>
          <p className={styles.title}>{book?.title}</p>
          <BookCard book={book} width={100} height={100} />
          <p className={styles.Deadline}>返却期限:</p>
          <p className={styles.Day}>2025/03/31</p>
          
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
