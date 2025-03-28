"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import classes from "./rental.module.scss";

export function ConfirmBtn() {
  // onst isbn = "9784815618599";
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/");
  };

  return (
    <div>
      <div className={classes.BtnCenter}>
        <Btn text="確認した" bgColor="#E2999B" onClick={handleConfirm} />
      </div>
    </div>
  );
}
