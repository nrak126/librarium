"use client";

import React, { useState } from "react";
import classes from "./index.module.scss";
import { Book } from "@/src/types/book";
import { BookCard } from "../BookCard";

export const BookInfo = ({ book }: { book: Book }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.BookInfo}>
      <p className={classes.Title}>{book.title}</p>
      <hr className={classes.hr} />
      <BookCard book={book} className={classes.card} width={150} height={200}/>

      {/* 著者情報 */}
      <div className={classes.InfoBox}>
        <div className={classes.AuthorLabel}>
          <p className={classes.Label}>著者</p>
        </div>
        <p className={classes.Author}>{book.author}</p>
      </div>

      {/* 出版社情報 */}
      <div className={classes.InfoBox}>
        <div className={classes.PublisherLabel}>
          <p className={classes.Label}>出版社</p>
        </div>
        <p className={classes.Publisher}>{book.publisher}</p>
      </div>

      {/* 続きを表示するセクション */}
      <div className={classes.ReadMore}>
        <input
          id="readMoreToggle"
          type="checkbox"
          className={classes.Input}
          checked={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
        <p className={classes.Description}>{book.description}</p>
        <label htmlFor="readMoreToggle" className={classes.ReadMoreLabel}>
          ...続きを読む
        </label>
        <label htmlFor="readMoreToggle" className={classes.ReadCloseLabel}>
          閉じる
        </label>
      </div>
    </div>
  );
};
