"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import classes from "./rental.module.scss";

export function Btns() {
  // onst isbn = "9784815618599";
  const router = useRouter();

  return (
    <div>
      <div className={classes.BtnRight}>
        <button onClick={() => router.back()} style={{ all: "unset" }}>
          <Btn text="戻る" bgColor="#99C6E2" />
        </button>
      </div>
      <div className={classes.BtnLeft}>
        <button
          onClick={() => router.push("/books/rental")}
          style={{ all: "unset" }}
        >
          <Btn text="借りる" bgColor="#E2999B" />
        </button>
      </div>
    </div>
  );
}
