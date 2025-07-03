"use client";

import React, { useState } from "react";
import classes from "./index.module.scss";
import { Book } from "@/src/types/book";
import { BookCard } from "../BookCard";
import authorIcon from "@/public/author.svg";
import publisherIcon from "@/public/publisher.svg";
import Image from "next/image";

export const BookInfo = ({ book }: { book: Book }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.BookInfo}>
      <p className={classes.Title}>{book.title}</p>
      <BookCard book={book} className={classes.card} width={150} height={200} />

      {/* 著者情報 */}
      <div className={classes.Author}>
        <div className={classes.AuthorLabel}>
          <Image
            src={authorIcon}
            alt="著者アイコン"
            width={127}
            height={130}
            className={classes.icon}
          />
          <p className={classes.AuthorName}>{book.author}</p>
        </div>

        <div className={classes.publisherLabel}>
          <Image
            src={publisherIcon}
            alt="出版社アイコン"
            width={127}
            height={130}
            className={classes.icon}
          />
          <p className={classes.AuthorName}>{book.publisher}</p>
        </div>
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
