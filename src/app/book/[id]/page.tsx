"use client";

import { useEffect, useState } from "react";
import { Book } from "@/src/types/book";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [bookInfo, setBookInfo] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const book: Book = await res.json();
        console.log("取得した本:", book);
        
        setBookInfo(book);
      } catch (err: any) {
        console.error("エラー:", err);
        setError("データの取得に失敗しました。");
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookInfo) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>{bookInfo.title}</h1>
      <p>著者: {bookInfo.author}</p>
      <p>説明: {bookInfo.description}</p>
      <p>ISBN: {bookInfo.id}</p>
      <p>出版社: {bookInfo.publisher}</p>
      <p>在庫数: {bookInfo.stock}</p>
      {bookInfo.thumbnail ? (
        <Image
          src={bookInfo.thumbnail}
          alt={bookInfo.title}
          width={200}
          height={300}
        />
      ) : (
        <p>サムネイル画像なし</p>
      )}
    </div>
  );
};