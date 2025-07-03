"use client";

import { Book } from "@/src/types/book";
import { useState } from "react";
import { BookInfo } from "@/src/components/book/BookInfo";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import styles from "./BookRegister.module.scss";
import { Btn } from "@/src/components/book/Btn";
import { convertHeicToJpeg, uploadBookThumbnail } from "@/src/utils/fileUtils";

interface BookRegisterProps {
  book: Book;
}

export const BookRegister: React.FC<BookRegisterProps> = ({ book }) => {
  const [, setBooks] = useAtom(booksAtom);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を追加

  const BookAdd = async () => {
    if (!book) return;

    setIsLoading(true);

    try {
      await fetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      // Atom に新しい本を追加
      setBooks((prevBooks) => {
        const updatedBooks = [...(prevBooks ?? []), book];
        return updatedBooks;
      });

      router.push(`/books/add/${book.isbn}/check`);
    } catch {
      // console.error("本の登録エラー:", error);
    }
  };

  const handleConfirm = () => {
    router.push("../");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      let fileToUpload = file;

      // HEICファイルの場合はJPEGに変換
      if (file.type === "image/heic") {
        console.log("HEICファイルを検出、JPEG形式に変換中...");
        fileToUpload = await convertHeicToJpeg(file);
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("isbn", isbn);

      const thumbnailUrl = await uploadBookThumbnail(fileToUpload, isbn);

      // 本の情報を更新（サムネイルURLを反映）
      if (book) {
        setBook({
          ...book,
          thumbnail: thumbnailUrl,
        });
      }
    } catch (error) {
      console.error("サムネイルアップロードエラー:", error);
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div>
      <BookInfo book={book} />
      <div className={styles.btnContainer}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleConfirm} />
        <Btn
          text={isLoading ? "登録中..." : "登録"}
          bgColor={isLoading ? "#F1CCCC" : "#E2999B"}
          onClick={isLoading ? undefined : BookAdd}
        />
      </div>
    </div>
  );
};
