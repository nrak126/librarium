"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { logedInUserAtom, rentalAtom } from "@/src/atoms/atoms";
import { useRouter } from "next/navigation";

export function RentBtn({
  book,
  loanPeriod,
  error,
  setError,
}: {
  book: Book;
  loanPeriod: number;
  error: boolean;
  setError: (value: boolean) => void;
}) {
  const router = useRouter();
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

  const handleClick = async () => {
    if (!loanPeriod) {
      setError(true);
      return;
    }
    setError(false);
    await handleRent();
    router.push(`/books/rental/${book.isbn}/check?q=${loanPeriod}`);
  };

  return (
    <div className={styles.rentalButtonWrapper}>
      <div className={styles.rentalButton}>
        {error && (
          <div className={styles.erroMessage}>※ 貸出期間を選択してください</div>
        )}
        <div className={styles.buttonRow}>
          <div className={styles.back}>
            <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
          </div>
          {isAvailableRental ? (
            <div className={styles.rental}>
              <Btn text="借りる" bgColor="#E2999B" onClick={handleClick} />
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
