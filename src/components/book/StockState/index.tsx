"use client";

import React from "react";
import classes from "./index.module.scss";
import { Book } from "@/src/types";
import { useState } from "react";

interface StockStateProps {
  initialBook: Book;
}

export const StockState: React.FC<StockStateProps> = ({ initialBook }) => {
  const [book, setBook] = useState(initialBook);

  const handleIncreaseAvailable = () => {
    setBook((prev) => ({
      ...prev,
      available: prev.available + 1,
      stock: prev.stock - 1,
    }));
  };

  const handleDecreaseAvailable = () => {
    if (book.available > 0) {
      setBook((prev) => ({
        ...prev,
        available: prev.available - 1,
        stock: prev.stock + 1,
      }));
    }
  };

  const isBorrowed = book.available === 0;

  return (
    <div className={classes.StockStateContainer}>
      <div
        className={`${classes.StockState} ${
          isBorrowed ? classes.borrowed : classes.available
        }`}
      >
        <span
          className={`${classes.StockStateIcon} ${
            isBorrowed ? classes.red : classes.green
          }`}
        />
        {isBorrowed ? "貸出中" : "貸出可"}
      </div>
    </div>
  );
};
