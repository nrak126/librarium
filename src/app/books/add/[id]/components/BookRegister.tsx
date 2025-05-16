"use client";

import { Book } from "@/src/types/book";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookInfo } from "@/src/components/book/BookInfo";
import { Genre } from "@/src/components/Genre";
import { Btns } from "../../components/Btns";
import Icon from "@/public/icon.svg";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
export const BookRegister = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [, setBooks] = useAtom(booksAtom);
  const router = useRouter();

  useEffect(() => {
    if (isbn) {
      (async () => {
        try {
          const response = await axios.get(
            `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_BOOKS_APP_ID}`
          );

          if (response.data.Items.length > 0) {
            const volumeInfo = response.data.Items[0].Item;
            const fetchedBook: Book = {
              isbn: isbn,
              title: volumeInfo.title || "タイトルが見つかりません",
              author: volumeInfo.author || "著者情報がありません",
              description: volumeInfo.itemCaption || "説明がありません",
              thumbnail: volumeInfo.largeImageUrl || "",
              publisher: volumeInfo.publisherName || "出版会社情報がありません",
              stock: 1,
              available: 1,
              tags: selectedGenres,
              created_at: new Date().toISOString(),
            };
            setBook(fetchedBook);
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
          setBook(null);
        }
      })();
    }
  }, [isbn, selectedGenres]);

  const BookAdd = async () => {
    if (!book) return;

    try {
      await fetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      // ✅ Atom に新しい本を追加したあとloacalstrageに追加
      setBooks((prevBooks) => {
        const updatedBooks = [...(prevBooks ?? []), book];

        // localStorage に保存
        localStorage.setItem("books", JSON.stringify(updatedBooks));

        return updatedBooks;
      });

      router.push(`/books/add/${isbn}/check`);
    } catch (error) {
      console.error("本の登録に失敗しました:", error);
    }
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
      {book ? (
        <>
          <BookInfo book={book} />
          <Genre onGenreChange={handleGenreChange} />
          <Btns BookAdd={BookAdd} />
        </>
      ) : (
        <p>本の情報が見つかりませんでした。ISBNを確認してください。</p>
      )}
    </div>
  );
};
