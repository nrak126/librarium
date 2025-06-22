"use client";

import { Book } from "@/src/types/book";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookInfo } from "@/src/components/book/BookInfo";
import { Genre } from "@/src/components/Genre";
import { Btns } from "../../components/Btns";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";

export const BookRegister = ({ isbn }: { isbn: string }) => {
  // ISBNがない場合は何もしない
  // if (!isbn || (isbn.length !== 10 && isbn.length !== 13)) {
  //   return <p>有効なISBN（10桁または13桁）を入力してください。</p>;
  // }

  // if (isbn.startsWith("978") && isbn.startsWith("979")) {
  //   return <p>ISBNではありません</p>;
  // }

  const [book, setBook] = useState<Book | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [, setBooks] = useAtom(booksAtom);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
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
              title: volumeInfo.title,
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
            setNotFound(true);
          }
        } catch (error) {
          console.error("エラー:", error);
          setNotFound(true);
        } finally {
          setLoading(false);
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

  if (notFound) {
    return (
      <p>指定されたISBNの本が見つかりませんでした。ISBNを確認してください。</p>
    );
  }

  if (loading) {
    return <LoadingBrown />;
  }

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
