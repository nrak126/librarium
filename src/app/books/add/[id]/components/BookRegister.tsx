"use client";

import { Book } from "@/src/types/book"; // Book 型をインポート
import { useEffect, useState } from "react";
import axios from "axios";
import { BookInfo } from "@/src/components/book/BookInfo";

export const BookRegister = ({ isbn }: { isbn: string }) => {
  const [book, setbook] = useState<Book | null>(null); // Book 型で本のすべての情報を管理する状態

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_BOOKS_APP_ID}`
        );

        console.log("取得したデータ:", response.data.Items);

        if (response.data.Items) {
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
            tags: volumeInfo.tags, // タグのデフォルト値
            created_at: volumeInfo.createdAt, // 作成日時
          };
          setbook(fetchedBook); // 本の情報をセット
        } else {
          setbook({
            isbn: isbn,
            title: "タイトルが見つかりません",
            author: "著者情報がありません",
            description: "説明がありません",
            thumbnail: "",
            publisher: "出版会社情報がありません",
            stock: 0,
            available: 0,
            tags: [],
            created_at: "",
          });
        }
      } catch (error) {
        console.error("エラー:", error);
        setbook(null); // エラーが発生した場合、nullにセット
      }
    };

    if (isbn) {
      fetchBookData();
    }
  }, [isbn]);

  return (
    <div>
      {/* ISBNが空ならBarcodeコンポーネントを表示 */}
      {/* ISBNがある場合は本の情報を表示 */}
      <>
        {book ? (
          <>
            <BookInfo book={book} />
            <button
              onClick={() =>
                fetch(`/api/books`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(book),
                })
              }
            >
              この本を登録
            </button>
          </>
        ) : (
          <p>本の情報が見つかりませんでした。ISBNを確認してください。</p>
        )}
      </>
    </div>
  );
};
