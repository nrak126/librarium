"use client";
import { BookInfo } from "@/src/components/book/BookInfo";
import { type Book } from "@/src/types/book";
import { useState, useEffect } from "react";

export function FetchBook({ isbn }: { isbn: string }) {
  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${isbn}`,
        {
          cache: "no-store",
        }
      );
      const book: Book = await res.json();
      setBook(book);
    };
    fetchBook();
  }, [isbn]);

  if (!book) {
    return <p>読み込み中...</p>;
  } else {
    return <BookInfo book={book} />;
  }
}
