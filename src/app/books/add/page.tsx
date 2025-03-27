"use client";
import { Book } from "@/src/types/book"; // Book 型をインポート
import React, { useEffect, useState } from "react";
import { Barcode } from "@/src/components/Barcode"; // Barcode コンポーネント
import axios from "axios";
import { BookEditor } from "@/src/components/BookEditor"; // パスは実際の場所に合わせて変更

import Image from "next/image";

const Page = () => {
  const [isbn, setIsbn] = useState<string>(""); // ISBN
  const [bookInfo, setBookInfo] = useState<Book | null>(null); // Book 型で本のすべての情報を管理する状態

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
          setBookInfo(fetchedBook); // 本の情報をセット
        } else {
          setBookInfo({
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
        setBookInfo(null); // エラーが発生した場合、nullにセット
      }
    };

    if (isbn) {
      fetchBookData();
    }
  }, [isbn]);

  return (
    <div>
      {/* ISBNが空ならBarcodeコンポーネントを表示 */}
      {!isbn ? (
        <Barcode setIsbn={setIsbn} />
      ) : (
        // ISBNがある場合は本の情報を表示
        <>
          {bookInfo ? (
            <>
              <p>名前: {bookInfo.title}</p>
              <p>著者: {bookInfo.author}</p>
              <p>isbn: {isbn}</p>
              <p>説明: {bookInfo.description.substring(0, 100) + "..."}</p>
              <p>出版社: {bookInfo.publisher}</p>
              <p>在庫: {bookInfo.stock}</p>
              <p>貸出可能: {bookInfo.available}</p>
              <BookEditor bookInfo={bookInfo} />
              {bookInfo.thumbnail ? (
                <Image
                  src={bookInfo.thumbnail}
                  alt="Book Cover"
                  width={200}
                  height={300}
                />
              ) : (
                <p>サムネイル画像なし</p>
              )}
              <button
                onClick={() =>
                  fetch(`/api/books`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookInfo),
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
      )}
    </div>
  );
};

export default Page;
