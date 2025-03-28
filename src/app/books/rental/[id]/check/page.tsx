// import { BookCard } from "@/src/components/book/BookCard";
// import { Book } from "@/src/types/book";
import { ConfirmBtn } from "@/src/app/books/rental/components/ConfirmBtn";
import styles from "./check.module.scss";
import React from "react";
import { FetchBook } from "../../components/fetchBook";

export default function Page() {
  const isbn = "9784815618599";

  return (
    <div>
      <FetchBook isbn={isbn} />
      <p className={styles.Deadline}>返却期限:</p>
      <p className={styles.Day}>2025/03/31</p>
      <ConfirmBtn />
    </div>
  );
}
