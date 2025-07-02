"use client";

import type { Book } from "@/src/types/book";
import styles from "./BooksList.module.scss";
import { BookCardList } from "./BookListCard";
import { StockState } from "@/src/components/book/StockState";

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function BooksList({ result }: { result: Book[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 18; // 1ページあたりの表示数

  const handleClick = (book: Book) => {
    router.push(`/books/${book.isbn}`);
  };

  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected);
  };

  const offset = currentPage * booksPerPage;
  const pagedBooks = result.slice(offset, offset + booksPerPage);
  const pageCount = Math.ceil(result.length / booksPerPage);

  return (
    <div className={styles.booksListContainer}>
      <ul className={styles.booklist}>
        {pagedBooks.map((book) => (
          <li key={book.isbn}>
            <div className={styles.layout}>
              <div onClick={() => handleClick(book)}>
                <BookCardList book={book} />
              </div>
              <div className={styles.stock}>
                <StockState initialBook={book} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
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
      )}
    </div>
  );
}
