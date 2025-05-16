"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { rentalAtom } from "@/src/atoms/atoms";
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

  const handleRent = async () => {
    const logedInUserData = localStorage.getItem("loginUser");
    let uid = null;

    if (logedInUserData) {
      try {
        const userObj = JSON.parse(logedInUserData);
        uid = userObj.id; // これでユーザーID取得できる
      } catch (e) {
        console.error("loginUser JSON parse error:", e);
      }
    }

    if (!uid) return;

    try {
      await fetch(`/api/books/rental`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isbn: book.isbn,
          uid: uid,
          loanPeriod: loanPeriod,
        }),
      });

      // レンタルリストの再取得
      const res = await fetch(`/api/loans/rentalList`);
      const rentalData = await res.json();
      setRental(rentalData);
      localStorage.setItem("rentalBooks", JSON.stringify(rentalData));
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
