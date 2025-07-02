"use client";
import { useState } from "react";
import style from "./Genre.module.scss"; // スタイルシートのパスを修正
import { Btn } from "../../Btn";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";

export const Genre = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>();

  const [loginUser, setLoginUser] = useAtom(logedInUserAtom); // ログインユーザーを取得

  const uid = loginUser?.uid;

  const genreList = [
    "Web",
    "モバイル",
    "バックエンド",
    "インフラ",
    "セキュリティー",
    "組み込み",
    "電子工作",
    "デザイン",
    "CG/ゲーム",
  ];

  const handleRadioChange = (genre: string) => {
    setSelectedGenre(genre);
    console.log("ラジオボタンが変更されました");
    console.log("選択されたジャンル:", genre);
  };

  const handleRecSearch = async () => {
    if (!selectedGenre) return;
    try {
      const res = await fetch(`/api/users/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest_tech: selectedGenre }),
      });
      if (res.ok) {
        setLoginUser((prev) => {
          if (!prev) return prev; // nullのまま
          return { ...prev, interest_tech: selectedGenre };
        });
        console.log("登録成功");
        window.location.href = "/";
      } else {
        alert("登録失敗");
      }
    } catch (e) {
      console.error("通信エラー", e);
    }
  };

  return (
    <>
      <div className={style.contents}>
        <h3 className={style.title}>興味のある分野を選択してください</h3>
        <div className={style.genreList}>
          {genreList.map((genre, index) => (
            <div className={style.genre} key={index}>
              <input
                onChange={() => handleRadioChange(genre)}
                className={style.input}
                type="radio"
                name="genre"
                id={`genre-${index}`}
                checked={selectedGenre === genre}
              />
              <label className={style.label} htmlFor={`genre-${index}`}>
                {genre}
              </label>
            </div>
          ))}
        </div>
        <div className={style.btnContainer}>
          <Btn text="決定" bgColor="#E2999B" onClick={handleRecSearch} />
          <Btn text="戻る" bgColor="#99C6E2" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};
