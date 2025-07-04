"use client";

import type { Book } from "@/src/types/book";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
// import ReactPaginate from "react-paginate";
import { useState } from "react";
import { BookCardList } from "@/src/app/books/components/BookListCard";
import { ReturnState } from "../ReturnState";
import { LoanWithBook } from "@/src/types";

export default function LoanHistBooks({
  hists,
}: {
  hists: LoanWithBook[] | null;
}) {
  const router = useRouter();
  const [currentPage] = useState(0);
  const booksPerPage = 18; // 1ページあたりの表示数

  if (!hists) return null;

  const handleClick = (book: Book) => {
    router.push(`/books/${book.isbn}`);
  };

  // const handlePageChange = (e: { selected: number }) => {
  //   setCurrentPage(e.selected);
  // };

  const offset = currentPage * booksPerPage;
  const pagedHists = hists.slice(offset, offset + booksPerPage);
  // const pageCount = Math.ceil(hists.length / booksPerPage);

  return (
    <>
      <div className={styles.booksListContainer}>
        {/* {pageCount > 1 && (
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
        )} */}
        <ul className={styles.booklist}>
          {pagedHists.map((h) => (
            <li key={h.id}>
              <div className={styles.layout}>
                <div onClick={() => handleClick(h.books)}>
                  <BookCardList book={h.books} />
                </div>
                <div className={styles.stock}>
                  <ReturnState hist={h} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
