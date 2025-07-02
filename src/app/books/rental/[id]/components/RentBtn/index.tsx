"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { logedInUserAtom, rentalAtom } from "@/src/atoms/atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RentBtn({
  book,
  loanPeriod,
}: {
  book: Book;
  loanPeriod: number;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAvailableRental = book.available > 0;
  const [, setRental] = useAtom(rentalAtom);
  const [loginUser] = useAtom(logedInUserAtom);

  const handleRent = async () => {
    if (!loginUser || isLoading) return;

    setIsLoading(true);
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
      router.push(`/books/rental/${book.isbn}/check?q=${loanPeriod}`);
    } catch (error) {
      console.error("レンタル処理エラー:", error);
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    window.history.back();
  };

  // const handleClick = async () => {
  //   if (!loanPeriod) {
  //     setError(true);
  //     return;
  //   }
  //   setError(false);
  //   await handleRent();
  //   router.push(`/books/rental/${book.isbn}/check?q=${loanPeriod}`);
  // };

  return (
    <div className={styles.rentalButtonWrapper}>
      <div className={styles.rentalButton}>
        <div className={styles.buttonRow}>
          <div className={styles.back}>
            <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
          </div>
          {isAvailableRental ? (
            <div className={styles.rental}>
              <Btn
                text={isLoading ? "処理中..." : "借りる"}
                bgColor={isLoading ? "#F1CCCC" : "#E2999B"}
                onClick={isLoading ? undefined : handleRent}
              />
            </div>
          ) : (
            <div className={styles.available}>
              <Btn text="貸出中" bgColor="#aaaaaa" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
