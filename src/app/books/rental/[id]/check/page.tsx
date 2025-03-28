import { BookCard } from "@/src/components/book/BookCard";
import { Book } from "@/src/types/book";
import { ConfirmBtn } from "@/src/app/books/rental/components/ConfirmBtn";
import styles from "./rental.module.scss";
import React from "react";
import { FetchBook } from "../../components/fetchBook";

export const Page = ({ book }: { book: Book }) => {
  const isbn = "9784815618599";

  return (
    <div>
      <p className={styles.Title}>{book.title}</p>

      <FetchBook isbn={isbn} />
      <BookCard book={book} />
      <p className={styles.Deadline}>返却期限:</p>
      <p className={styles.Day}>2025/03/31</p>
      <ConfirmBtn />
    </div>
  );
}
