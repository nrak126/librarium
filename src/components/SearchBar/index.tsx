"use client";

import style from "./index.module.scss";
import { Icon } from "@iconify/react";


interface SearchBarProps {
  func?: string;
  clickBy?: string;
  setSearchCilck: (value: boolean) => void;
  searchCilck: boolean;
  setSearchName: (value: string) => void;
  searchName: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  func = "書籍検索",
  clickBy = "homeSearch",
  setSearchCilck,
  searchCilck,
  setSearchName,
  searchName,
}) => {

  const handleSearch = () => {

    setSearchCilck(true);
    console.log("検索ボタンが押されました。");
    // console.log(`検索ワード：${searchName}`);

    if (clickBy === "homeSearch") {
      // 個別の検索処理を実行
      console.log(`setSearchClick: ${searchCilck}, homeSearch`);
    }

    if (clickBy === "usersSearch") {
      // 個別の検索処理を実行
      console.log(`setSearchClick: ${searchCilck}, usersSearch`);
    }
  };

  return (
    <div className={style.contents}>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder={func}
          value={searchName}
          className={style.searchBar}
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <Icon
          icon="bi:search"
          className={style.searchIcon}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};
