"use client";

import React from "react";
import { Btn } from "@/src/components/book/Btn";
import { useRouter } from "next/navigation";
import style from "./rental.module.scss";
import { Book } from "@/src/types";

interface BtnsProps {
  BookAdd?: () => void;
  test?: string;
  book?: Book; // Adjust type as necessary
  isUploading?: boolean; // Optional prop for loading state
}

export const Btns: React.FC<BtnsProps> = (props) => {
  const { book, isUploading } = props;
  // onst isbn = "9784815618599";
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const bookCheck = async () => {
    if (!book) return;

    // bookの情報をURLパラメータとして渡す
    const bookData = encodeURIComponent(JSON.stringify(book));
    router.push(`/books/add/${book.isbn}/check2?bookData=${bookData}`);
  };

  return (
    <div className={style.contents}>
      <div className={style.BtnRight}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      <div className={style.BtnLeft}>
        <Btn
          text={isUploading ? "画像アップロード中..." : "確認"}
          bgColor={isUploading ? "#F1CCCC" : "#E2999B"}
          onClick={isUploading ? undefined : bookCheck}
        />
 
      </div>
    </div>
  );
};
