"use client";

import React from "react";
import classes from "./BookCardList.module.scss";
import Image from "next/image";
import { Book } from "@/src/types/book";
import NotFound from "@/public/bookNot.svg";

export const BookCardList = ({ book }: { book: Book }) => {
  return (
    <>
      <div className={classes.BookImg}>
        <Image
          className={classes.Img}
          src={book.thumbnail || NotFound}
          alt="本の表紙画像"
          width={100}
          height={150}
        />
      </div>
    </>
  );
};
