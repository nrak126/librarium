"use client";

import styles from "./check.module.scss";
import React, { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { usePathname } from "next/navigation";
import { BookCard } from "@/src/components/book/BookCard";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";

export default function PageClient() {
  const [book, setBook] = useState<Book | null>();
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 2];
  const router = useRouter();

  useEffect(() => {
    const cached = localStorage.getItem(`books-${isbn}`);
    if (cached) {
      const parsed: Book = JSON.parse(cached);
      setBook(parsed);

      return;
    }

    (async () => {
      const res = await fetch(`/api/books/${isbn}`);
      const data = await res.json();
      setBook(data);
      localStorage.setItem(`books-${isbn}`, JSON.stringify(data));
    })();
  }, [isbn]);

  const handleConfirm = () => {
    router.push("/");
  };

  if (!isbn || !book) {
    return <LoadingBrown />;
  }

  return (
    <div>
      {book ? (
        <div className={styles.contents}>
          <p className={styles.title}>{book.title}</p>
          <BookCard
            book={book}
            width={150}
            height={180}
            className={styles.card}
          />
          <p className={styles.returnCheck}>返却が完了しました</p>
          <div className={styles.Btn}>
            <Btn text="確認した" bgColor="#E2999B" onClick={handleConfirm} />
          </div>
        </div>
      ) : (
        <LoadingBrown />
      )}
    </div>
  );
}
