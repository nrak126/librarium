"use client";

import { Book } from "@/src/types/book";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BookInfo } from "@/src/components/book/BookInfo";
import { Btns } from "../../components/Btns";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";

export const BookRegister = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [, setBooks] = useAtom(booksAtom);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  // メインのフェッチ関数（サーバーAPIでGoogle→楽天→Geminiの順で取得）
  const fetchBookData = useCallback(
    async (isbn: string): Promise<Book | null> => {
      try {
        const response = await axios.get(`/api/books/bookInfo?isbn=${isbn}`);
        if (response.data && response.data.isbn) {
          return response.data;
        }
        return null;
      } catch (error) {
        console.error("AI書誌APIエラー:", error);
        return null;
      }
    },
    []
  );

  // useEffectを修正
  useEffect(() => {
    if (isbn) {
      (async () => {
        try {
          const fetchedBook = await fetchBookData(isbn);

          if (fetchedBook) {
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
  }, [isbn, fetchBookData]);

  const BookAdd = async () => {
    if (!book) return;

    try {
      await fetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      // Atom に新しい本を追加
      setBooks((prevBooks) => {
        const updatedBooks = [...(prevBooks ?? []), book];
        return updatedBooks;
      });

      router.push(`/books/add/${isbn}/check`);
    } catch {
      return <p>本の登録に失敗しました</p>;
    }
  };

  if (loading) {
    return <LoadingBrown />;
  }

  if (notFound) {
    return (
      <p>
        指定されたISBN（{isbn}
        ）の本が見つかりませんでした。ISBNを確認してください。
      </p>
    );
  }

  return (
    <div>
      {book ? (
        <>
          <BookInfo book={book} />
          <Btns BookAdd={BookAdd} />
        </>
      ) : (
        <p>本の情報が見つかりませんでした。ISBNを確認してください。</p>
      )}
    </div>
  );
};
