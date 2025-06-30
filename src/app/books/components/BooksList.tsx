"use client";

import type { Book } from "@/src/types/book";
import styles from "./BooksList.module.scss";
import { BookCardList } from "./BookListCard";
import { StockState } from "@/src/components/book/StockState";

import { useRouter } from "next/navigation";

export default function BooksList({ result }: { result: Book[] }) {
  const router = useRouter();

  const handleClick = (book: Book) => {
    router.push(`/books/${book.isbn}`);
  };

  return (
    <ul className={styles.booklist}>
      {result.map((book) => (
        <li key={book.isbn}>
          <div className={styles.layout}>
            <div onClick={() => handleClick(book)}>
              <BookCardList book={book} />
            </div>
            <div className={styles.stock}>
              <StockState initialBook={book} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
