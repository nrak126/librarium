"use client";
import { Book } from "@/src/types/book"; // Book 型をインポート
import React, { useEffect, useState } from "react";
import { Barcode } from "@/src/components/books/ScanBarcode"; // Barcode コンポーネント
import axios from "axios";
import { BookEditor } from "@/src/components/books/BookEditor"; // パスは実際の場所に合わせて変更
import { IndustryIdentifier } from "@/src/types/book"; // IndustryIdentifier 型をインポート

import Image from "next/image";

const Page = () => {
  const [isbn, setIsbn] = useState<string>(""); // ISBN
  const [bookInfo, setBookInfo] = useState<Book | null>(null); // Book 型で本のすべての情報を管理する状態

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${isbn}&startIndex=0&maxResults=1&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );

        // ISBN-13 の一致確認
        const isMatched = response.data.items.some(
          (item: {
            volumeInfo: {
              industryIdentifiers: IndustryIdentifier[];
            };
          }) =>
            item.volumeInfo?.industryIdentifiers?.some(
              (identifier: IndustryIdentifier) =>
                identifier.type === "ISBN_13" && identifier.identifier === isbn
            )
        );

        if (
          response.data.items &&
          response.data.items.length > 0 &&
          isMatched
        ) {
          const volumeInfo = response.data.items[0].volumeInfo;
          const fetchedBook: Book = {
            isbn: isbn, // ISBN
            title: volumeInfo.title || "タイトルが見つかりません",
            author: volumeInfo.authors
              ? volumeInfo.authors.join(", ") //著者が複数いる場合カンマ区切り
              : "著者情報がありません",
            publishedDate: new Date(volumeInfo.publishedDate || ""), // 日付のフォーマットを合わせる
            description: volumeInfo.description || "説明がありません",
            coverImage: volumeInfo.imageLinks?.thumbnail || "", // 画像URL
            quantity: 1, // 数量のデフォルト値（必要なら変更）
            publisher: volumeInfo.publisher || "出版会社情報がありません",
          };
          setBookInfo(fetchedBook); // 本の情報をまとめて状態にセット
        } else {
          setBookInfo({
            isbn: "",
            title: "タイトルが見つかりません",
            author: "著者情報がありません",
            publishedDate: new Date(),
            description: "説明がありません",
            coverImage: "",
            quantity: 0,
            publisher: "出版会社情報がありません",
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
              <p>出版日: {bookInfo.publishedDate.toLocaleDateString()}</p>
              <p>isbn: {isbn}</p>
              <p>説明: {bookInfo.description}</p>
              <p>出版社: {bookInfo.publisher}</p>
              <BookEditor bookInfo={bookInfo} />
              {bookInfo.coverImage && bookInfo.coverImage !== "" && (
                <Image
                  src={bookInfo.coverImage}
                  alt="Book Cover"
                  width={100}
                  height={100}
                />
              )}
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
