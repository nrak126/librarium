"use client";

import React from "react";
import classes from "./index.module.scss";
import Image from "next/image";
import { Book } from "@/src/types/book";

export const BookCard = ({ book }: { book: Book }) => {
	return (
		<div className={classes.BookImg}>
        <Image
          className={classes.Img}
          src={book.thumbnail}
          alt="本の表紙画像"
          width={100}
          height={100}
        />
      </div>
	);
}