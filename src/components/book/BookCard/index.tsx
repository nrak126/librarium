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
  className,
}) => {
  return (
    <div
      className={`${classes.BookImg} ${className || ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        className={classes.Img}
        src={book.thumbnail || NotFound}
        alt="本の表紙画像"
        width={width}
        height={height}
      />
    </div>
  );
};
