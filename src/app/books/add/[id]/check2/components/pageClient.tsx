"use client";

import { useSearchParams } from "next/navigation";
import { Book } from "@/src/types";
import { BookRegister } from "../../components/BookRegister";

export const PageClient = () => {
  const searchParams = useSearchParams();
  const bookDataParam = searchParams.get("bookData");

  let book: Book | null = null;
  if (bookDataParam) {
    try {
      book = JSON.parse(decodeURIComponent(bookDataParam));
    } catch {
      // console.error("Failed to parse book data:", error);
    }
  }

  console.log("bookDataParam:", book);

  if (!book) {
    return <div>書籍情報が見つかりません</div>;
  }

  return (
    <div>
      <BookRegister book={book} />
    </div>
  );
};
