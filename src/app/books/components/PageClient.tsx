"use client";

import BooksList from "../components/BooksList";
import SearchBar from "@/src/components/SearchBar";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import type { Book } from "@/src/types";
import LoadingBrown from "@/src/components/LoadingBrown";

export default function PageClient() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search") || "";

  const [books, setBooks] = useAtom(booksAtom); // Jotai atom でグローバル books 利用
  const [result, setResult] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // 初回のみbooksをフェッチ（すでに取得済ならスキップ）
  useEffect(() => {
    if (books === null) {
      (async () => {
        const booksRes = await fetch(`/api/books`);
        const booksData: Book[] = await booksRes.json();
        setBooks(booksData);
      })();
    }
  }, [books, setBooks]);

  // 検索フィルタリング処理
  useEffect(() => {
    (async () => {
      if (searchName) {
        setHasSearched(true);
        const fetchFilteredBooks = await fetch(
          `/api/books?search=${searchName}`
        );
        const filteredBooks: Book[] = await fetchFilteredBooks.json();
        setResult(filteredBooks);
      } else {
        if (!books) return;
        setResult(books);
        setHasSearched(false);
      }
    })();
  }, [searchName, books]);

  if (hasSearched && result.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.subtitle}>本が見つかりませんでした</h3>
        <p className={styles.description}>
          申し訳ありませんが、検索された本は存在しません。
          <br />
          他のキーワードで探してください。
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>書籍一覧</div>
        <div className={styles.bar}>
          <SearchBar />
          <div className={styles.card}>
            <div className={styles.list}>
              {result ? <BooksList result={result} /> : <LoadingBrown />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
