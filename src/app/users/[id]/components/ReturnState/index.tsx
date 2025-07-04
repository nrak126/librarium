"use client";

import React from "react";
import classes from "./index.module.scss";
import { Book, LoanWithBook } from "@/src/types";

export function ReturnState({ hist }: {hist: LoanWithBook}) {
  const isBorrowed = hist.isReturned;

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
        {isBorrowed ? "返却済み" : "貸出中"}
      </div>
    </div>
  );
};
