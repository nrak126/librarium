"use client"

import { BookInfo } from "@/src/components/book/BookInfo";
import { Book } from "@/src/types";
import { RentBtn } from "./RentBtn";
import { LoanPeriod } from "./LoanPeriod";
import { useState } from "react";
import styles from "./index.module.scss";


export default function PageClient({ book }: { book: Book }) {
	const [loanPeriod, setLoanPeriod] = useState<number>(0);
  return (
    <>
      <BookInfo book={book} />
      <p className={styles.Text}>貸出期限</p>
      <LoanPeriod setLoanPeriod={setLoanPeriod} />
      <RentBtn book={book} loanPeriod={loanPeriod} />
    </>
  );
}
