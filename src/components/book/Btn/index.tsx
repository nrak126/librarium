"use client";

import React from "react";
import classes from "./index.module.scss";

interface BtnProps {
  text: string;
  bgColor: string;
  handleClick: () => void;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const Btn: React.FC<BtnProps> = ({
  text,
  bgColor,
  handleClick,
  position,
  top,
  left,
  right,
  bottom,
}) => {
  return (
    <button
      className={classes.BaseBtn}
      style={{
        backgroundColor: bgColor,
        position: position || "relative",
        top: top || "auto",
        left: left || "auto",
        right: right || "auto",
        bottom: bottom || "auto",
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
