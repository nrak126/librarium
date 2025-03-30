"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import styles from "./components/return.module.scss";

import Link from "next/link";

export function ReturnBtn({ book }: { book: Book }) {
  // const isAvailableReturn = book.available > 0;

  // const handleReturn = async () => {
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${book.isbn}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(book),
  //   });

  //   const logedInUserData = await supabase.auth.getUser();

  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/rental`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       isbn: book.isbn,
  //       uid: logedInUserData.data.user?.id,
  //     }),
  //   });
  // };

  const handleReturn = () => {
    window.history.back();
  };
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className={styles.back}>
        <Btn text="キャンセル" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      <div className={styles.return}>
        <Link href={`/books/rental/${book.isbn}/check`}>
          <Btn text="返却" bgColor="#BADE99" onClick={handleReturn} />
        </Link>
      </div>
    </div>
  );
}
