import { useEffect, useState } from "react";
import style from "./index.module.scss";
import type { Book } from "@/src/types/book";
import Image from "next/image";

export const BookRec = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data: Book[] = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className={style.contents}>
      {books.map((appName, index) => (
        <div key={index} className={style.content}>
          <div className={style.card}>
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
