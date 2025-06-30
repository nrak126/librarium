"use client";
import { useState } from "react";
import style from "./Genre.module.scss"; // スタイルシートのパスを修正
import { Btn } from "../../Btn";

interface GenreProps {
  handleSearch: (genre: string) => void;
}

export const Genre: React.FC<GenreProps> = ({ handleSearch }) => {
  const [selectedGenre] = useState<string>("Web");

  const genreList = [
    "Web",
    "モバイル",
    "バックエンド",
    "インフラ",
    "セキュリティー",
    "インフラ",
    "組み込み",
    "電子工作",
    "デザイン",
    "CG/ゲーム",
  ];

  const handleRadioChange = () => {
    console.log("選択されたジャンル:", selectedGenre);
  };

  return (
    <>
      <div className={style.contents}>
        <h3 className={style.title}>興味のある分野を選択してください</h3>
        <div className={style.genreList}>
          {genreList.map((genre, index) => (
            <div className={style.genre} key={index}>
              <input
                onChange={() => handleRadioChange()}
                className={style.input}
                type="radio"
                name="genre"
                id={`genre-${index}`}
              />
              <label className={style.label} htmlFor={`genre-${index}`}>
                {genre}
              </label>
            </div>
          ))}
        </div>
        <div className={style.btnContainer}>
          <Btn
            text="決定"
            bgColor="#E2999B"
            onClick={() => handleSearch(selectedGenre)}
          />
          <Btn text="戻る" bgColor="#99C6E2" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};
