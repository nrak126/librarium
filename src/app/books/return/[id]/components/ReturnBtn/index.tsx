"use client";

import { Btn } from "@/src/components/book/Btn";

import styles from "../return.module.scss";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { rentalAtom } from "@/src/atoms/atoms";
import { Loan } from "@/src/types";

type Props = {
  loan: Loan;
  isbn: string;
  loanId: string | null;
};

export function ReturnBtn(props: Props) {
  const router = useRouter();
  const { loan, isbn, loanId } = props;
  const [, setReturn] = useAtom(rentalAtom);

  const handleReturn = async () => {
    await fetch(`/api/books/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn: isbn, loanId: loanId }),
    });

    setReturn((prev) => {
      if (!prev) return prev;
      const updated = prev.filter((book) => book.isbn !== isbn);
      return updated;
    });

    router.push(`/books/return/${isbn}/check`);
    //この中に返却すると返せるようにする
  };
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className={styles.returnButton}>
        <div className={styles.back}>
          <Btn text="キャンセル" bgColor="#99C6E2" onClick={handleBack} />
        </div>
        {loan.isReturned ? (
          <div className={styles.return}>
            <Btn text="返却済み" bgColor="#aaaaaa" />
          </div>
        ) : (
          <div className={styles.return}>
            <Btn text="返却" bgColor="#BADE99" onClick={handleReturn} />
          </div>
        )}
      </div>
    </div>
  );
}
