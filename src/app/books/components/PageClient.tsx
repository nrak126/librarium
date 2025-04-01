"use client";

import BooksList from "../components/BooksList";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { Book } from "@/src/types";
import { useSearchParams } from "next/navigation";

export default function PageClient() {
  // ここでサーバーから初期データ取得してもいい（任意）
  //const books = await fetchBooks();
  const searchParams = useSearchParams();
  const seaarchNameData = searchParams.get("searchName") || "";

  console.log(seaarchNameData);
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState(seaarchNameData || "");
  const [searchWordClick, setSearchWordClick] = useState(
    seaarchNameData ? true : false
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [result, setResult] = useState<Book[]>([]);

  console.log("sss", searchName);

  useEffect(() => {
    (async () => {
      const booksRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`
      );

      const booksData: Book[] = await booksRes.json();
      setBooks(booksData);
    })();
  }, []);
  useEffect(() => {
    // console.log("セットワードクリック", { searchWordClick });
    if (searchWordClick === true) {
      // console.log("books", { books });
      const filteredBooks: Book[] = books.filter(
        (book) =>
          typeof searchName === "string" && book.tags.includes(searchName)
      );

      console.log("filteredBooks", filteredBooks);
      setResult(filteredBooks);
    } else {
      setResult(books);
    }
  }, [searchWordClick, books, searchName]);

  return (
    <>
      <div>
        <div className={styles.whole}>
          <div className={styles.title}>書籍一覧</div>
          <div className={styles.bar}>
            <SearchBar
              searchClick={searchClick}
              setSearchClick={setSearchClick}
              searchName={typeof searchName === "string" ? searchName : ""}
              setSearchName={setSearchName}
              setSearchWordClick={setSearchWordClick}
              searchWordClick={searchWordClick}
            />
            <div className={styles.card}>
              <div className={styles.list}>
                <BooksList result={result} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
