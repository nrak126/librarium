"use client";
import { useEffect, useState } from "react";
import type { Book } from "@/src/types/book";
import Link from "next/link";

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    })();
  }, []);

  return (
    <>
      <h1>本のリスト</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title} </h3>
            <p>{book.author}</p>
            <Link href={`book/${book.id}`}>
            <button>詳細GO</button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
