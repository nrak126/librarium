"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import styles from "./return.module.scss";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "@/src/types";
import { ReturnBtn } from "./ReturnBtn";
import LoadingBrown from "@/src/components/LoadingBrown";
import { supabase } from "@/src/lib/supabase";

export const PageClient = () => {
  const searchParams = useSearchParams();
  const returnDate = searchParams.get("returnDate"); // クエリから取得
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isbn = pathArr[pathArr.length - 1];

  const [book, setBook] = useState<Book | null>(null);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const renBooks = await fetch(`/api/books/${isbn}`);
        const book: Book = await renBooks.json();
        setBook(book);

        const logedInUser = await supabase.auth.getUser();
        const { data, error } = logedInUser;
        if (error) {
          return <h1>ログイン中のユーザ情報を取得できませんでした。</h1>;
        }
        setUid(data.user.id);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();
  }, [isbn]);

  return (
    <>
      {!book ? (
        <LoadingBrown />
      ) : (
        <div className={styles.contents}>
          {book && <BookInfo book={book} />}
          <p className={styles.Day}>返却期限：{returnDate ?? "不明"}</p>
          <ReturnBtn isbn={isbn} uid={uid} />
        </div>
      )}
    </>
  );
};
