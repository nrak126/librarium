"use client";

import React from "react";
import classes from "./index.module.scss";

interface BtnProps {
  text: string;
  bgColor: string;
  onClick?: () => void | Promise<void>;
}

export const Btn: React.FC<BtnProps> = ({
  text,
  bgColor,
  onClick,
}) => {
  return (
    <button
      className={classes.BaseBtn}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
