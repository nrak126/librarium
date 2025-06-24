"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { logedInUserAtom, rentalAtom } from "@/src/atoms/atoms";
import Link from "next/link";

export function RentBtn({
  book,
  loanPeriod,
}: {
  book: Book;
  loanPeriod: number;
}) {
  const isAvailableRental = book.available > 0;
  const [, setRental] = useAtom(rentalAtom);
  const [loginUser] = useAtom(logedInUserAtom);

  const handleRent = async () => {
    if (!loginUser) return;

    try {
      await fetch(`/api/books/rental`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isbn: book.isbn,
          uid: loginUser.uid,
          loanPeriod: loanPeriod,
        }),
      });

      // レンタルリストの再取得
      const res = await fetch(`/api/loans/rentalList`);
      const rentalData = await res.json();
      setRental(rentalData);
    } catch (error) {
      console.error("レンタル処理エラー:", error);
    }
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className={styles.rentalButton}>
        <div className={styles.back}>
          <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
        </div>
        {isAvailableRental ? (
          <div className={styles.rental}>
            <Link href={`/books/rental/${book.isbn}/check?q=${loanPeriod}`}>
              <Btn text="借りる" bgColor="#E2999B" onClick={handleRent} />
            </Link>
          </div>
        ) : (
          <div className={styles.available}>
            <Btn text="貸出中" bgColor="#aaaaaa" />
          </div>
        )}
      </div>
    </div>
  );
}
