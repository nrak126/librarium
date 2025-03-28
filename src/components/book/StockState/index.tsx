"use client";

import React from "react";
import classes from "./index.module.scss";

interface StockStateProps {
  isBorrowed: boolean;
}

export const StockState: React.FC<StockStateProps> = ({ isBorrowed }) => {
  return (
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
      {isBorrowed ? "貸出中" : "在庫あり"}
    </div>
  );
};
