import { Book } from "@/src/types/book";
import PageClient from "./components/PageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // ここでエラーハンドリング（404ページ返すとか）
    // throw new Error(`HTTP error! status: ${res.status}`);
    return <h1>本の情報を取得できませんでした</h1>;
  }

  const book: Book = await res.json();

  return <PageClient book={book} />;
}
