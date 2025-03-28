"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import classes from "./rental.module.scss";

interface BtnsProps {
  BookAdd: () => void;
  test?: string;
}

export const Btns: React.FC<BtnsProps> = (props) => {
  const { BookAdd } = props;
  // onst isbn = "9784815618599";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className={classes.BtnRight}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      <div className={classes.BtnLeft}>
        <Btn text="登録" bgColor="#E2999B" onClick={BookAdd} />
      </div>
    </div>
  );
};
