"use client";

import React from "react";
import classes from "./index.module.scss";
import Image from "next/image";
import { Book } from "@/src/types/book";

export const BookInfo = ({ book }: { book: Book }) => {
  return (
    <div className={classes.BookInfo}>
      <p className={classes.Title}>{book.title}</p>
      <hr className={classes.hr} />
      <div className={classes.BookImg}>
        <Image
          className={classes.Img}
          src={book.thumbnail}
          alt="本の表紙画像"
          width={100}
          height={100}
        />
      </div>
      <div className={classes.InfoBox}>
        <div className={classes.AuthorLabel}>
          <p className={classes.Label}>著者</p>
        </div>
        <p className={classes.Author}>{book.author}</p>
      </div>
      <div className={classes.InfoBox}>
        <div className={classes.PublisherLabel}>
          <p className={classes.Label}>出版社</p>
        </div>
        <p className={classes.Publisher}>{book.publisher} </p>
      </div>
      <div className={classes.ReadMore}>
        <input id="readMoreToggle" type="checkbox" className={classes.Input} />
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
