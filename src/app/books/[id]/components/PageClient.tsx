"use client";

// app/book/[id]/page.tsx
import { Book } from "@/src/types/book";
import { BookInfo } from "@/src/components/book/BookInfo";
import { BackBtn } from "../components/BackBtn";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";
import { booksAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";

export const PageClient = () => {
  const pathname = usePathname();
  const isbn = pathname.split("/").pop() ?? "";
  const [books] = useAtom(booksAtom);
  const [book, setBook] = useState<Book | null>();

  useEffect(() => {
    if (!books || !isbn) return;

    const cached = books.find((book) => book.isbn === isbn);
    setBook(cached || null);
  }, [books, isbn]);

  if (!book) {
    return <LoadingBrown />;
  }

  return (
    <div>
      {book && <BookInfo book={book} />}
      <div style={{ margin: "20px" }}>
        <BackBtn />
      </div>
    </div>
  );
};
