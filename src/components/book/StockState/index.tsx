"use client";

import React from "react";
import classes from "./index.module.scss";
import { Book } from "@/src/types";
import { useState } from "react";

interface StockStateProps {
  initialBook: Book;
}

export const StockState: React.FC<StockStateProps> = ({ initialBook }) => {
  const isBorrowed = initialBook.available > 0;

  return (
    <div className={classes.StockStateContainer}>
      <div
        className={`${classes.StockState} ${
          isBorrowed ? classes.borrowed : classes.available
        }`}
      >
        <span
          className={`${classes.StockStateIcon} ${
            isBorrowed ? classes.green : classes.red
          }`}
        />
        {isBorrowed ? "貸出可" : "貸出中"}
      </div>
    </div>
  );
};
