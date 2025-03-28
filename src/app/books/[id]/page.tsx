// app/book/[id]/page.tsx
import Image from "next/image";
import { Book } from "@/src/types/book";

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
      <h1>{book.title}</h1>
      <p>著者: {book.author}</p>
      <p>説明: {book.description}</p>
      <p>ISBN: {book.isbn}</p>
      <p>出版社: {book.publisher}</p>
      <p>在庫数: {book.stock}</p>
      {book.thumbnail ? (
        <Image src={book.thumbnail} alt={book.title} width={200} height={300} />
      ) : (
        <p>サムネイル画像なし</p>
      )}
    </div>
  );
}