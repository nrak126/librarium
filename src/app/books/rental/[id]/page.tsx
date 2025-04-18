import { Book } from "@/src/types/book";
import { BookInfo } from "@/src/components/book/BookInfo";

import { RentBtn } from "./components/RentBtn";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `/api/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // ここでエラーハンドリング（404ページ返すとか）
    // throw new Error(`HTTP error! status: ${res.status}`);
		return <h1>本の情報を取得できませんでした</h1>
  }

  const book: Book = await res.json();

  return (
    <>
      <BookInfo book={book} />
      <RentBtn book={book} />
    </>
  );
}
