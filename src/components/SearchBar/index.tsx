"use client";

import style from "./index.module.scss";
import { Icon } from "@iconify/react";
import sampleData from "../Users/sampleData";

interface SearchBarProps {
  func?: string;
  clickBy?: string;
  setSearchClick?: (value: boolean) => void;
  searchClick?: boolean;
  setSearchName?: (value: string) => void;
  searchName?: string;
  setSearchWordClick?: (value: boolean) => void;
  searchWordClick?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  func = "書籍検索",
  clickBy = "homeSearch",
  setSearchClick,
  searchClick,
  setSearchName,
  searchName,
  setSearchWordClick,
  searchWordClick,
}) => {
  const handleSearch = () => {
    if (setSearchClick) {
      setSearchClick(true);
    }
    if (setSearchWordClick) {
      setSearchWordClick(true);
    }
    console.log("検索ボタンが押されました。");
    // console.log(`検索ワード：${searchName}`);

    if (clickBy === "homeSearch") {
      // 個別の検索処理を実行
      console.log(
        `SearchClick: ${searchClick},SearchWordClick: ${searchWordClick}, homeSearch`
      );
    }

    if (clickBy === "usersSearch") {
      // 個別の検索処理を実行
      console.log(
        `setSearchClick: ${searchClick}, SearchWordClick: ${searchWordClick}, usersSearch`
      );
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
            if (setSearchName) {
              setSearchName(event.target.value);
            }
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
