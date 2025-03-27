"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/src/types/book";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const pathname = usePathname();

console.log("pathname:", pathname);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data: Book[] = await response.json();
      setBooks(data);
      console.log("Fetched books:", data);
    };
    fetchBooks();
  }, []);
  
  return (
    <ul>
      {books.map((book) => (
        <li key={book.isbn}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <Link href={`${pathname}/${book.isbn}`}>
            <button>詳細GO</button>
          </Link>
        </li>
      ))}
    </ul>
  );
}