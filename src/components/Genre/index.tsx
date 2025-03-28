import { useState } from "react";
import style from "./index.module.scss";

export const Genre = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const genreList = [
    "モバイル",
    "Web",
    "フロント",
    "バック",
    "データーベース",
    "組み込み",
    "インフラ",
    "ゲーム",
    "デザイン",
    "電気",
    "教科書",
    "啓発本",
    "単行本",
  ];

  const handleCheckboxChange =
    (genre: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      // チェックされた場合、選択したジャンルを配列に追加
      if (isChecked) {
        setSelectedGenres((prevGenres) => [...prevGenres, genre]);
        // チェックが外れた場合、選択したジャンルを配列から削除
      } else {
        setSelectedGenres((prevGenres) =>
          prevGenres.filter((item) => item !== genre)
        );
      }
    };
  console.log(selectedGenres);

  return (
    <div className={style.contents}>
      <h2 className={style.title}>ジャンル選択</h2>
      <p className={style.description}>
        本のジャンルを選択してください。複数選択可能です。
      </p>
      <div className={style.genreList}>
        {genreList.map((genre, index) => (
          <div className={style.genre} key={index}>
            <input
              onChange={handleCheckboxChange(genre)}
              className={style.input}
              type="checkbox"
              id={`genre-${index}`}
            />
            <label className={style.label}>{genre}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
