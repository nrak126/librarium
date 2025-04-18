"use client";

import { Book } from "@/src/types/book"; // Book 型をインポート
import { useEffect, useState } from "react";
import axios from "axios";
import { BookInfo } from "@/src/components/book/BookInfo";
import { Genre } from "@/src/components/Genre";
import { Btns } from "../../components/Btns";
import Icon from "@/public/icon.svg";
import { useRouter } from "next/navigation";

export const BookRegister = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>(null); // Book 型で本のすべての情報を管理する状態
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // 選択されたジャンルを管理
  const router = useRouter();

  useEffect(() => {
    if (isbn) {
      (async () => {
        try {
          const response = await axios.get(
            `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_BOOKS_APP_ID}`
          );

          console.log("取得したデータ:", response.data.Items);

          if (response.data.Items.length > 0) {
            const volumeInfo = response.data.Items[0].Item;
            const fetchedBook: Book = {
              isbn: isbn, // ISBN
              title: volumeInfo.title || "タイトルが見つかりません",
              author: volumeInfo.author || "著者情報がありません",
              description: volumeInfo.itemCaption || "説明がありません",
              thumbnail: volumeInfo.largeImageUrl || "",
              publisher: volumeInfo.publisherName || "出版会社情報がありません",
              stock: 1, // 数量のデフォルト値
              available: 1, // 数量のデフォルト値
              tags: selectedGenres,
              created_at: new Date().toISOString(), // 作成日時
            };
            setBook(fetchedBook); // 本の情報をセット
          } else {
            setBook({
              isbn: isbn,
              title: "タイトルが見つかりません",
              author: "著者情報がありません",
              description: "説明がありません",
              thumbnail: Icon,
              publisher: "出版会社情報がありません",
              stock: 0,
              available: 0,
              tags: selectedGenres,
              created_at: "",
            });
          }
        } catch (error) {
          console.error("エラー:", error);
          setBook(null); // エラーが発生した場合、nullにセット
        }
      })();
    }
  }, [isbn, selectedGenres]);

  const BookAdd = () => {
    fetch(`/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    router.push(`/books/add/${isbn}/check`);
  };

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
    if (book) {
      setBook((prevBook) => ({
        ...prevBook!,
        tags: genres,
      }));
    }
  };

  return (
    <div>
      {/* ISBNが空ならBarcodeコンポーネントを表示 */}
      {/* ISBNがある場合は本の情報を表示 */}
      <>
        {book ? (
          <>
            <BookInfo book={book} />
            <Genre onGenreChange={handleGenreChange} />
            <Btns BookAdd={BookAdd} />
          </>
        ) : (
          <p>本の情報が見つかりませんでした。ISBNを確認してください。</p>
        )}
      </>
    </div>
  );
};
