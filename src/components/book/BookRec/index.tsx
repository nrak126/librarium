"use client";

import style from "./index.module.scss";
import type { Book } from "@/src/types/book";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BookRecProps = {
  books: Book[];
};

export const BookRec: React.FC<BookRecProps> = (props) => {
  const { books } = props;

  const router = useRouter();

  const handleClickDetail = (link: string) => {
    router.push(`books/${link}`);
  };
  return (
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
