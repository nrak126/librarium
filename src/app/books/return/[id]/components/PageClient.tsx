"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import styles from "./return.module.scss";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReturnBtn } from "./ReturnBtn";
import LoadingBrown from "@/src/components/LoadingBrown";

import { Book } from "@/src/types";
import { useAtom } from "jotai";
import { booksAtom, logedInUserAtom } from "@/src/atoms/atoms";

export const PageClient = () => {
  const searchParams = useSearchParams();
  const returnDate = searchParams.get("returnDate");
  const pathname = usePathname();
  const isbn = pathname.split("/").pop() ?? "";

  const [book, setBook] = useState<Book | null>(null);
  const [loginUser] = useAtom(logedInUserAtom);
  const [, setLoading] = useState(true);
  const [books] = useAtom(booksAtom);

  // 本のデータ取得（キャッシュ優先）
  useEffect(() => {
    if (!books || !isbn) return;

    const cached = books.find((book) => book.isbn === isbn);
    if (cached) {
      setBook(cached);
      setLoading(false);
    } else {
      // キャッシュにない場合の処理（必要に応じて）
      setLoading(false);
    }
  }, [isbn, books]);

  // ログインユーザーがいない場合
  if (!loginUser) {
    return (
      <div className={styles.contents}>
        <p>ログインしていません。</p>
      </div>
    );
  }

  if (!isbn || !book) {
    return <LoadingBrown />;
  }

  const uid = loginUser.uid;

  return (
    <div className={styles.contents}>
      {<BookInfo book={book} />}
      <p className={styles.Day}>返却期限：{returnDate ?? "不明"}</p>
      <ReturnBtn isbn={isbn} uid={uid} />
    </div>
  );
};
