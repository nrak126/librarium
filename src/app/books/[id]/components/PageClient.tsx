"use client";

// app/book/[id]/page.tsx
import { Book } from "@/src/types/book";
import { BookInfo } from "@/src/components/book/BookInfo";
import { BackBtn } from "../components/BackBtn";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const PageClient = () => {
  const pathname = usePathname();
  const isbn = pathname.split("/").pop() ?? "";

  const [book, setBook] = useState<Book[] | null>();

  // 本のデータ取得（キャッシュ優先）
  useEffect(() => {
    const cached = localStorage.getItem(`books-${isbn}`);
    if (cached) {
      setBook([JSON.parse(cached)]);
      return;
    }

    (async () => {
      const res = await fetch(`/api/books/${isbn}`);
      const data = await res.json();
      setBook([data]);
      localStorage.setItem(`book-${isbn}`, JSON.stringify(data));
    })();
  }, [isbn]);

  return (
    <div>
      {book && <BookInfo book={book[0]} />}
      <div style={{ margin: "20px" }}>
        <BackBtn />
      </div>
    </div>
  );
};
