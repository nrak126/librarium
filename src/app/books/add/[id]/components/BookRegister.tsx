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
  const [book, setBook] = useState<Book | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [, setBooks] = useAtom(booksAtom);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  const fetchFromGoogle = async (isbn: string): Promise<Book | null> => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${isbn}&startIndex=0&maxResults=1&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );
      console.log("Google Books APIレスポンス:", response.data);

      if (response.data.items && response.data.items.length > 0) {
        const volumeInfo = response.data.items[0].volumeInfo;

        return {
          isbn: isbn,
          title: volumeInfo.title || "タイトル不明",
          author: volumeInfo.authors
            ? volumeInfo.authors.join(", ")
            : "著者情報がありません",
          description: volumeInfo.description || "説明がありません",
          thumbnail: volumeInfo.imageLinks?.thumbnail || "",
          publisher: volumeInfo.publisher || "出版会社情報がありません",
          stock: 1,
          available: 1,
          tags: selectedGenres,
          created_at: new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error("googleAPIエラー:", error);
      return null;
    }
  };

  // 楽天APIから本の情報を取得する関数
  const fetchFromRakuten = async (isbn: string): Promise<Book | null> => {
    try {
      const response = await axios.get(
        `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_BOOKS_APP_ID}`
      );

      if (response.data?.Items && response.data.Items.length > 0) {
        const item = response.data.Items[0].Item;

        return {
          isbn: isbn,
          title: item.title || "タイトル不明",
          author: item.author || "著者情報がありません",
          description: item.itemCaption || "説明がありません",
          thumbnail:
            item.largeImageUrl ||
            item.mediumImageUrl ||
            item.smallImageUrl ||
            "",
          publisher: item.publisherName || "出版会社情報がありません",
          stock: 1,
          available: 1,
          tags: selectedGenres,
          created_at: new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error("楽天APIエラー:", error);
      return null;
    }
  };

  // openBD APIから本の情報を取得する関数
  const fetchFromOpenBD = async (isbn: string): Promise<Book | null> => {
    try {
      const response = await axios.get(
        `https://api.openbd.jp/v1/get?isbn=${isbn}&pretty`
      );

      if (response.data && response.data[0] && response.data[0].summary) {
        const summary = response.data[0].summary;

        let detail = "説明がありません";
        try {
          if (response.data[0].onix?.CollateralDetail?.TextContent?.[0]?.Text) {
            detail = response.data[0].onix.CollateralDetail.TextContent[0].Text;
          }
        } catch (e) {
          console.log("onixデータが取得できませんでした:", e);
        }

        return {
          isbn: isbn,
          title: summary.title || "タイトル不明",
          author: summary.author || "著者情報がありません",
          description:
            summary.series || summary.volume || detail || "説明がありません",
          thumbnail: summary.cover || "",
          publisher: summary.publisher || "出版会社情報がありません",
          stock: 1,
          available: 1,
          tags: selectedGenres,
          created_at: new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.log("openBD APIエラー:", error);
      return null;
    }
  };

  // メインのフェッチ関数（楽天 → openBD の順で試す）
  const fetchBookData = async (isbn: string): Promise<Book | null> => {
    console.log("Google Books APIから取得を試みます...");
    let fetchedBook = await fetchFromGoogle(isbn);

    if (!fetchedBook) {
      console.log("Google Books APIで見つからないため、楽天APIを試します...");
      fetchedBook = await fetchFromRakuten(isbn);
    }

    if (!fetchedBook) {
      console.log("楽天APIで見つからないため、openBD APIを試します...");
      fetchedBook = await fetchFromOpenBD(isbn);
    }

    return fetchedBook;
  };

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
  }, [isbn, selectedGenres]);

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
