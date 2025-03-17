"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // usePathname をインポート
import axios from "axios";
import { Book } from "@/src/types/book";
import Image from "next/image";

const Page: React.FC = () => {
  const pathname = usePathname(); // usePathname で現在のパスを取得
  const pathSegments = pathname.split("/"); // パスを / で分割
  const id = pathSegments[pathSegments.length - 1]; // 最後の部分が id

  const [bookInfo, setBookInfo] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) {
      console.log("ID が取得できませんでした");
      return;
    }

    console.log("取得した ID:", id);

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books`);
        const data = response.data;

        const book = data.find((b: Book) => b.isbn === id);
        if (!book) {
          setBookInfo(null);
          return;
        }

        console.log("Received publishedDate:", book.publishedDate);

        const fetchedBook: Book = {
          isbn: id,
          title: book.title || "タイトルが見つかりません",
          author: book.authors
            ? book.authors.join(", ")
            : "著者情報がありません",
          publishedDate: book.publishedDate?._seconds
            ? new Date(book.publishedDate._seconds * 1000)
            : new Date(),
          description: book.description || "説明がありません",
          coverImage: book.imageLinks?.thumbnail || "",
          quantity: 1,
          publisher: book.publisher || "出版会社情報がありません",
        };
        setBookInfo(fetchedBook);
      } catch (error) {
        console.error("エラー:", error);
        setBookInfo(null);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!bookInfo) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>{bookInfo.title}</h1>
      <p>著者: {bookInfo.author}</p>
      <p>
        出版日:{" "}
        {bookInfo.publishedDate
          ? new Date(bookInfo.publishedDate).toLocaleDateString()
          : "不明"}
      </p>
      <p>{bookInfo.description}</p>
      <p>ISBN: {bookInfo.isbn}</p>
      <p>出版社: {bookInfo.publisher}</p>
      <p>在庫数: {bookInfo.quantity}</p>
      {bookInfo.coverImage ? (
        <Image src={bookInfo.coverImage} alt={bookInfo.title} />
      ) : null}
    </div>
  );
};

export default Page;
