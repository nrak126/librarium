"use client";

import React from "react";
import classes from "./index.module.scss";
import Image from "next/image";
import { Book } from "@/src/types/book";
import NotFound from "@/public/bookNot.svg";

interface BookCardProps {
  book: Book;
  width?: number;
  height?: number;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  width,
  height,
}) => {
  return (
    <div className={classes.BookImg}>
      <div className={classes.card}>
        <Image
          className={classes.Img}
          src={book.thumbnail ? book.thumbnail : NotFound}
          alt="本の表紙画像"
          width={width}
          height={height}
          unoptimized={true}
        />
      </div>
    </div>
  );
};
