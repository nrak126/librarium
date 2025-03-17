"use client";
import { BookEditorProps } from "@/src/types/book";
import { Book } from "@/src/types/book"; // Book 型をインポート

import React, { useState } from "react";

export const BookEditor: React.FC<BookEditorProps> = (props) => {
  const { bookInfo } = props;

  const [book, setBook] = useState<Book>(bookInfo); // Book 型で本のすべての情報を管理する状態

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // bookのタイトルだけを更新
    setBook((prevBook) => ({
      ...prevBook,
      title: e.target.value,
    }));
  };

  return (
    <>
      <input
        style={{ color: "black" }}
        value={book.title}
        onChange={handleTitleChange}
      />
    </>
  );
};
