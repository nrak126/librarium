// app/book/[id]/page.tsx
import Image from "next/image";
import { Book } from "@/src/types/book";
import { BookInfo } from "@/src/components/book/BookInfo";
import { BackBtn } from "./components/BackBtn";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // ここでエラーハンドリング（404ページ返すとか）
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const book: Book = await res.json();

  return (
    <div>
      <BookInfo book={book} />
      <BackBtn />
    </div>
  );
}