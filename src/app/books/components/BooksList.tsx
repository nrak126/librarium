"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/src/types/book";
import Link from "next/link";
import styles from "./BooksList.module.scss";
import { BookCardList } from "./BookListCard";
import { StockState } from "@/src/components/book/StockState";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`
      );
      const data: Book[] = await response.json();
      setBooks(data);
      console.log("Fetched books:", data);
    })();
  }, []);

  return (
    <ul className={styles.booklist}>
      {books.map((book) => (
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
