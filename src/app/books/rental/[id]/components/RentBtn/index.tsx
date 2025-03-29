"use client";

import { Btn } from "@/src/components/book/Btn";
import { Book } from "@/src/types";
import { supabase } from "@/src/lib/supabase";
import styles from "./index.module.scss";

import Link from "next/link";

export function RentBtn({ book }: { book: Book }) {
  const isAvailableRental = book.available > 0;

  const handleRent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${book.isbn}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    const logedInUserData = await supabase.auth.getUser();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/rental`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isbn: book.isbn,
        uid: logedInUserData.data.user?.id,
      }),
    });
  };

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className={styles.back}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      {isAvailableRental ? (
        <div className={styles.rental}>
          <Link href={`/books/rental/${book.isbn}/check`}>
            <Btn text="借りる" bgColor="#E2999B" onClick={handleRent} />
          </Link>
        </div>
      ) : (
        <div className={styles.available}>
          <Btn text="貸出中" bgColor="#aaaaaa" />
        </div>
      )}
    </div>
  );
}
