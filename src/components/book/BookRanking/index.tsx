"use client";

import { booksRankingAtom } from "@/src/atoms/atoms";
import { HomeBook } from "../HomeBook";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const BookRanking = () => {
  const [books, setBooks] = useAtom(booksRankingAtom);

  useEffect(() => {
    // データが存在しない場合（初回 or 期限切れ）のみフェッチ
    if (books === null) {
      const fetchBooks = async () => {
        try {
          const response = await fetch("/api/books/ranking");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.error(" Error fetching books:", error);
        }
      };

      fetchBooks();
    }
  }, [books, setBooks]);

  return <HomeBook showNumber={true} books={books ?? []} />;
};
