"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "@/src/types";
import LoadingBrown from "../../LoadingBrown";
import { StockState } from "../StockState";

export const BookRanking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  // localStorageから読み込み（初回のみ）
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

  return loading || books.length === 0 ? (
    <div className={style.loading}>
      <LoadingBrown />
    </div>
  ) : (
    <div className={style.contents}>
      {books.map((appName, index) => {
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
              onClick={() => handleClickDetail(appName.isbn)}
              className={style.card}
            >
              <div className={`${style.ranking} ${rankClass}`}>
                <div className={style.number}>{index + 1}</div>
              </div>
              <Image
                className={style.image}
                src={appName.thumbnail}
                alt={appName.title}
                width={100}
                height={128}
              />
              <p className={style.text}>{appName.title}</p>

              <div className={style.stock}>
                <StockState initialBook={appName} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
