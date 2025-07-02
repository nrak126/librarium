"use client";

import { HomeBook } from "../HomeBook";
import React, { useEffect, useState, useCallback } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import icon from "@/public/rei.svg";
import { Btn } from "../Btn";
import { Genre } from "./components/Genre";
import { Book } from "@/src/types";
import { useRouter } from "next/navigation";
import { logedInUserAtom, loginRecBookAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";
import LoadingBrown from "../../LoadingBrown";
export const BookRec = () => {
  const [showSelect, setShowSelect] = useState(false); // ← 追加
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [loginUser] = useAtom(logedInUserAtom); // ログインユーザーを取得
  const [books, setBooks] = useAtom(loginRecBookAtom); // 本のリストを管理
  const [noDataFound, setNoDataFound] = useState(false); // 追加：データなし状態を管理

  // const interestTech = loginUser?.interest_tech;

  const router = useRouter();

  const handleClick = () => {
    // ここにボタンがクリックされたときの処理を追加
    setShowSelect(true);
  };

  const handleBack = () => {
    router.push("/books/rec");
  };

  const handleSearch = useCallback(async () => {
    setIsLoading(true); // ローディング開始
    setNoDataFound(false); // 検索開始時にリセット
    const response = await fetch(
      `/api/books/?search=${loginUser?.interest_tech}`
    );
    if (response.ok) {
      const data = await response.json();
      if (!data || data.length === 0) {
        setIsLoading(false); // ローディング終了
        setBooks([]); // 本のリストを空にする
        setNoDataFound(true); // データなし状態をセット
        return;
      }

      // Book型にマッピング
      const books: Book[] = data.map((item: Book) => ({
        isbn: item.isbn,
        createdAt: item.createdAt,
        title: item.title,
        thumbnail: item.thumbnail,
        description: item.description,
        author: item.author,
        stock: item.stock,
        available: item.available,
        tags: item.tags,
        publisher: item.publisher,
      }));
      setIsLoading(false);
      setShowSelect(false); // セレクト画面を閉じる
      setBooks(books); // 取得した本のリストを更新
      console.log("取得した本のリスト:", books);
    } else {
      console.error("検索に失敗しました");
      setIsLoading(false); // エラー時もローディング終了
    }
  }, [loginUser?.interest_tech, setBooks]);

  useEffect(() => {
    if (
      loginUser?.interest_tech &&
      loginUser.interest_tech.trim() !== "" &&
      !showSelect &&
      (!books || books.length === 0) &&
      !noDataFound && // データなし状態の場合は実行しない
      !isLoading // ローディング中も実行しない
    ) {
      handleSearch();
    }
  }, [
    loginUser?.interest_tech,
    showSelect,
    books?.length,
    noDataFound,
    isLoading,
    books,
    handleSearch,
  ]);

  if (showSelect) {
    // セレクト画面だけを表示
    return (
      <div className={style.container}>
        <Genre />
      </div>
    );
  }

  // データなし状態の表示を追加
  if (noDataFound) {
    return <p className={style.noBooks}>おすすめの本がありません</p>;
  }

  if (isLoading) {
    // ローディング中の表示
    return <LoadingBrown />;
  }

  if (!books) return;

  return (
    <div>
      {loginUser?.interest_tech && loginUser.interest_tech.trim() !== "" ? (
        <HomeBook showNumber={false} books={books} />
      ) : (
        <>
          <div className={style.noRec}>
            <h3 className={style.title}>おすすめ診断</h3>
            <p className={style.diagText}>
              あなたにおすすめの技術書を診断してみませんか？
            </p>
            <Image
              src={icon}
              alt="診断イメージ"
              width={200}
              height={100}
              className={style.diagImage}
            />
            <p className={style.diagText}>既に興味のある分野がありますか？</p>
          </div>
          <div className={style.btnContainer}>
            <Btn text="はい" bgColor="E2999B" onClick={handleClick} />
            <Btn text="いいえ" bgColor="#99C6E2" onClick={handleBack} />
          </div>
        </>
      )}
    </div>
  );
};
