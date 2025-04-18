// app/book/[id]/page.tsx
import { Book } from "@/src/types/book";
import { BookInfo } from "@/src/components/book/BookInfo";
import { BackBtn } from "./components/BackBtn";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(`api/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1>データの取得に失敗しました。</h1>;
  }

  const book: Book = await res.json();

  return (
    <div>
      <BookInfo book={book} />
      <BackBtn />
    </div>
  );
}
