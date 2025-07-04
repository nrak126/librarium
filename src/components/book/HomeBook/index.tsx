"use client";

import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StockState } from "../StockState";
import NotFound from "@/public/bookNot.svg";
import { Book } from "@/src/types";
import { useState } from "react";
import LoadingBrown from "../../LoadingBrown";

type BookListBaseProps = {
  showNumber: boolean;
  books: Book[];
};

export const HomeBook: React.FC<BookListBaseProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { showNumber, books } = props;
  const router = useRouter();

  const handleClickDetail = async (link: string) => {
    setLoading(true);
    try {
      router.push(`/books/${link}`);
    } catch (error) {
      console.error("ページ遷移エラー:", error);
    }
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingBrown />
      </div>
    );
  }

  return (
    <div className={style.contents}>
      {books.map((books, index) => {
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
              onClick={() => handleClickDetail(books.isbn)}
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
                src={
                  books.thumbnail && books.thumbnail.startsWith("http")
                    ? books.thumbnail
                    : NotFound
                }
                alt={books.title}
                width={100}
                height={128}
                unoptimized={true}
              />
              <p className={style.text}>{books.title}</p>
              <StockState initialBook={books} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
