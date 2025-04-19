"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import classes from "./BackBtn.module.scss";

export function BackBtn() {
  // onst isbn = "9784815618599";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className={classes.bntContens}>
        <div className={classes.BtnCenter}>
          <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
        </div>
      </div>
    </div>
  );
}
