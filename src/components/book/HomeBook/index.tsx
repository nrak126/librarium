"use client";

import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StockState } from "../StockState";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import NotFound from "@/public/bookNot.svg";

type BookListBaseProps = {
  showNumber: boolean;
};

export const HomeBook: React.FC<BookListBaseProps> = (props) => {
  const { showNumber } = props;
  const [books] = useAtom(booksAtom);
  const router = useRouter();

  const handleClickDetail = (link: string) => {
    router.push(`/books/${link}`);
  };

  // if (loading || books?.length === 0) {
  //   return (
  //     <div className={style.loading}>
  //       <LoadingBrown />
  //     </div>
  //   );
  // }

  return (
    <div className={style.contents}>
      {books?.map((book, index) => {
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
                src={book.thumbnail || NotFound}
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
