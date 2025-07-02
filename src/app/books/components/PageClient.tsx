"use client";

import BooksList from "../components/BooksList";
import SearchBar from "@/src/components/SearchBar";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import type { Book } from "@/src/types";

export default function PageClient() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search") || "";

  const [books, setBooks] = useAtom(booksAtom); // Jotai atom でグローバル books 利用
  const [result, setResult] = useState<Book[]>([]);

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
        const fetchFilteredBooks = await fetch(
          `/api/books?search=${searchName}`
        );
        const filteredBooks: Book[] = await fetchFilteredBooks.json();
        setResult(filteredBooks);
      } else {
        if (!books) return;
        setResult(books);
      }
    })();
  }, [searchName, books]);

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>書籍一覧</div>
        <div className={styles.bar}>
          <SearchBar />
          <div className={styles.card}>
            <div className={styles.list}>
              <BooksList result={result} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
