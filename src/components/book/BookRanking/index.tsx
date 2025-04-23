"use client";

import React, { useState } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "@/src/types";
import LoadingBrown from "../../LoadingBrown";

type BookRecProps = {
  books: Book[];
};

export const BookRanking: React.FC<BookRecProps> = (props) => {
  const { books } = props;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClickDetail = async (link: string) => {
    try {
      setLoading(true);
      await router.push(`books/${link}`);
    } catch {
      <p>失敗</p>;
    }
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
            </div>
            <p className={style.text}>{appName.title}</p>
          </div>
        );
      })}
    </div>
  );
};
