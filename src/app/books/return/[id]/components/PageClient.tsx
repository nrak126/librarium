"use client";

import { BookInfo } from "@/src/components/book/BookInfo";
import styles from "./return.module.scss";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReturnBtn } from "./ReturnBtn";
import LoadingBrown from "@/src/components/LoadingBrown";

import { Book } from "@/src/types";

export const PageClient = () => {
  const searchParams = useSearchParams();
  const returnDate = searchParams.get("returnDate");
  const pathname = usePathname();
  const isbn = pathname.split("/").pop() ?? "";

  const [book, setBook] = useState<Book[] | null>(null);
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // ユーザーID取得（localStorageから）
  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.id) setUid(parsed.id);
      } catch (e) {
        console.error("loginUser JSON parse error:", e);
      }
    }
  }, []);

  // 本のデータ取得（キャッシュ優先）
  useEffect(() => {
    const cached = localStorage.getItem(`books-${isbn}`);
    if (cached) {
      setBook([JSON.parse(cached)]);
      setLoading(false);
      return;
    }

    (async () => {
      const res = await fetch(`/api/books/${isbn}`);
      const data = await res.json();
      setBook([data]);
      localStorage.setItem(`book-${isbn}`, JSON.stringify(data));
      setLoading(false);
    })();
  }, [isbn]);

  if (loading || !book) {
    return <LoadingBrown />;
  }

  return (
    <div className={styles.contents}>
      {<BookInfo book={book[0]} />}
      <p className={styles.Day}>返却期限：{returnDate ?? "不明"}</p>
      <ReturnBtn isbn={isbn} uid={uid} />
    </div>
  );
};
