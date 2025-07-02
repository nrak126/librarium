"use client";

import { HomeBook } from "../HomeBook";
import React, { useEffect, useState, useCallback } from "react";
import style from "./index.module.scss";
import { Genre } from "./components/Genre";
import { Book } from "@/src/types";
import { logedInUserAtom, loginRecBookAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";
import LoadingBrown from "../../LoadingBrown";
import { Diagnosis } from "./components/diagnosis";

export const BookRec = () => {
  const [showSelect, setShowSelect] = useState(false); // ← 追加
  const [showDia, setShowDia] = useState(false); // ← 追加
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [loginUser] = useAtom(logedInUserAtom); // ログインユーザーを取得
  const [books, setBooks] = useAtom(loginRecBookAtom); // 本のリストを管理
  const [noDataFound, setNoDataFound] = useState(false); // 追加：データなし状態を管理

  const interestTech = loginUser?.interest_tech;

  const handleClick = () => {
    // ここにボタンがクリックされたときの処理を追加
    setShowSelect(true);
  };

  const handleDiaClick = () => {
    setShowDia(true); // セレクト画面を閉じて診断画面を表示
  };

  const handleSearch = useCallback(async () => {
    setIsLoading(true); // ローディング開始
    setNoDataFound(false); // 検索開始時にリセット
    const response = await fetch(`/api/books/?search=${interestTech}`);
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
  }, [loginUser?.interest_tech, setBooks, interestTech]);

  useEffect(() => {
    if (
      loginUser?.interest_tech &&
      loginUser.interest_tech.trim() !== "" &&
      !showSelect &&
      (!books || books.length === 0) &&
      !noDataFound &&
      !isLoading
    ) {
      handleSearch();
    }
  }, [
    loginUser?.interest_tech,
    showSelect,
    books?.length,
    noDataFound,
    isLoading,
    handleSearch,
    books,
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
    return (
      <>
        {showDia ? (
          <Diagnosis handleClick={handleClick} />
        ) : (
          <>
            <p className={style.noBooks}>おすすめの本がありません</p>
            <HomeBook showNumber={false} books={books || []} />
            <div className={`${style.btnContainer} ${style.noData}`}>
              <p className={style.text}>もう一度診断してみる？</p>
              <button className={style.btn} onClick={handleDiaClick}>
                再診断
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  if (isLoading) {
    // ローディング中の表示
    return <LoadingBrown />;
  }

  return (
    <div>
      {loginUser?.interest_tech && loginUser.interest_tech.trim() !== "" ? (
        <>
          {showDia ? (
            <Diagnosis handleClick={handleClick} />
          ) : (
            <>
              <HomeBook showNumber={false} books={books || []} />
              <div className={style.btnContainer}>
                <p className={style.text}>もう一度診断してみる？</p>
                <button className={style.btn} onClick={handleDiaClick}>
                  再診断
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Diagnosis handleClick={handleClick} />
        </>
      )}
    </div>
  );
};
