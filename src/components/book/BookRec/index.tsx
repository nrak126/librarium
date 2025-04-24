"use client";

import style from "./index.module.scss";
import type { Book } from "@/src/types/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingBrown from "../../LoadingBrown";

type BookRecProps = {
  books: Book[];
};

export const BookRec: React.FC<BookRecProps> = (props) => {
  const { books } = props;
  const [loading, setLading] = useState(false);

  const router = useRouter();

  const handleClickDetail = (link: string) => {
    try {
      setLading(true);
      router.push(`books/${link}`);
    } catch {
      <p>失敗しました</p>;
    }
  };
  return loading ? (
    <div className={style.loading}>
      <LoadingBrown />
    </div>
  ) : (
    <div className={style.contents}>
      {books.map((appName, index) => (
        <div key={index} className={style.content}>
          <div
            onClick={() => handleClickDetail(appName.isbn)}
            className={style.card}
          >
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
      ))}
    </div>
  );
};
