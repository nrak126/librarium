"use client";

import React from "react";
import classes from "./BookCardList.module.scss";
import Image from "next/image";
import { Book } from "@/src/types/book";
import NotFound from "@/public/bookNot.svg";
import { StockState } from "@/src/components/book/StockState";

export const BookCardList = ({ book }: { book: Book }) => {
  return (
    <>
      <div className={classes.card}>
        <div className={classes.layout}>
          <Image
            className={classes.Img}
            src={book.thumbnail || NotFound}
            alt="本の表紙画像"
            width={80}
            height={110}
          />
          <div className={classes.stock}>
            <StockState initialBook={book} />
          </div>
        </div>
      </div>
    </>
  );
};
