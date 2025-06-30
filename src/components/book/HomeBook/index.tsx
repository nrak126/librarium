"use client";

import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StockState } from "../StockState";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import NotFound from "@/public/bookNot.svg";
import { Book } from "@/src/types";

type BookListBaseProps = {
  showNumber: boolean;
  books: Book[];
};

export const HomeBook: React.FC<BookListBaseProps> = (props) => {
  const { showNumber, books } = props;
  const router = useRouter();

  const handleClickDetail = (link: string) => {
    router.push(`/books/${link}`);
  };

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
              <div className={style.stock}>
                <StockState initialBook={books} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
