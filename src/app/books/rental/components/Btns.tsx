"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import classes from "./rental.module.scss";

export function Btns() {
  // onst isbn = "9784815618599";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

    const handleRental = () => {
      router.push("/books/rental/check");
    };


  
  return (
    <div>
      <div className={classes.BtnRight}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      <div className={classes.BtnLeft}>
        <Btn text="借りる" bgColor="#E2999B" onClick={handleRental} />
      </div>
    </div>
  );
}
