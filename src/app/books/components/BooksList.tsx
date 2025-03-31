"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/src/types/book";
import Link from "next/link";
import styles from "./BooksList.module.scss";
import { BookCardList } from "./BookListCard";
import { StockState } from "@/src/components/book/StockState";

export default function BooksList({ result }: { result: Book[] }) {
  // const [books, setBooks] = useState<Book[]>([]);

  // useEffect(() => {
  //   if (result) {
  //     setBooks(result);
  //     console.log("一覧", { result });
  //   }
  // }, []);

  return (
    <ul className={styles.booklist}>
      {result.map((book) => (
        <li key={book.isbn}>
          <div className={styles.layout}>
            <Link href={`/books/${book.isbn}`}>
              <BookCardList book={book} />
            </Link>
            <div className={styles.stock}>
              <StockState initialBook={book} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
