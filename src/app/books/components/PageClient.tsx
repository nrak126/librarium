"use client";

import BooksList from "../components/BooksList";
import SearchBar from "@/src/components/SearchBar";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import type { Book } from "@/src/types";
import ReactPaginate from "react-paginate";

export default function PageClient() {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search") || "";

  const [books, setBooks] = useAtom(booksAtom); // Jotai atom でグローバル books 利用
  const [result, setResult] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 18; // 1ページあたりの表示数

  // 初回のみbooksをフェッチ（すでに取得済ならスキップ）
  useEffect(() => {
    if (books === null) {
      (async () => {
        const booksRes = await fetch(`/api/books`);
        const booksData: Book[] = await booksRes.json();
        setBooks(booksData);
      })();
    }
  }, [books, setBooks]);

  // 検索フィルタリング処理
  useEffect(() => {
    (async () => {
      if (searchName) {
        const fetchFilteredBooks = await fetch(
          `/api/books?search=${searchName}`
        );
        const filteredBooks: Book[] = await fetchFilteredBooks.json();
        setResult(filteredBooks);
      } else {
        if (!books) return;
        setResult(books);
      }
    })();
  }, [searchName, books]);

  // ページネーションで表示する書籍リストを計算
  const offset = currentPage * booksPerPage;
  const pagedBooks = result.slice(offset, offset + booksPerPage);
  const pageCount = Math.ceil(result.length / booksPerPage);

  // ページ変更時のハンドラ
  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected);
  };

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>書籍一覧</div>
        <div className={styles.bar}>
          <SearchBar />
          <div className={styles.card}>
            <div className={styles.list}>
              <BooksList result={pagedBooks} />
            </div>
          </div>
        </div>
      </div>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination} // ページネーション全体
        pageClassName={styles.pageItem} // 各ページ番号(li)のクラス
        pageLinkClassName={styles.pageLink} // 各ページ番号(a)のクラス
        activeClassName={styles.Active} // 現在ページのliに付与
        previousLabel="←" // 「前へ」ラベル
        nextLabel="→" // 「次へ」ラベル
        previousClassName={styles.pageItem} // 「前へ」ボタンのli
        nextClassName={styles.pageItem} // 「次へ」ボタンのli
        previousLinkClassName={styles.pageLink} // 「前へ」ボタンのa
        nextLinkClassName={styles.pageLink} // 「次へ」ボタンのa
        breakLabel="..." // 省略記号
      />
    </>
  );
}
