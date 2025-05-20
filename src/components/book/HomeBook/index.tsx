"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "@/src/types";
import LoadingBrown from "../../LoadingBrown";
import { StockState } from "../StockState";

type BookListBaseProps = {
  showNumber: boolean;
};

export const HomeBook: React.FC<BookListBaseProps> = (props) => {
  const { showNumber } = props;
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const booksJson = localStorage.getItem("books");
    if (booksJson) {
      const parsedBooks = JSON.parse(booksJson);
      setBooks(parsedBooks);
    }
    setLoading(false);
  }, []);

  const handleClickDetail = (link: string) => {
    setLoading(true);
    router.push(`/books/${link}`);
  };

  if (loading || books.length === 0) {
    return (
      <div className={style.loading}>
        <LoadingBrown />
      </div>
    );
  }

  return (
    <div className={style.contents}>
      {books.map((book, index) => {
        const rankClass =
          index === 0
            ? style.gold
            : index === 1
            ? style.silver
            : index === 2
            ? style.bronze
            : style.default;

        return (
          <div key={index} className={style.content}>
            <div
              onClick={() => handleClickDetail(book.isbn)}
              className={style.card}
            >
              {/* ランキングなら表示 */}
              {showNumber && (
                <div className={`${style.ranking} ${rankClass}`}>
                  <div className={style.number}>{index + 1}</div>
                </div>
              )}

              <Image
                className={style.image}
                src={book.thumbnail}
                alt={book.title}
                width={100}
                height={128}
              />
              <p className={style.text}>{book.title}</p>
              <div className={style.stock}>
                <StockState initialBook={book} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
