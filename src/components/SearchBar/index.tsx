"use client";
import React, { useState } from "react";
import style from "./index.module.scss";
import { Icon } from "@iconify/react";

interface SearchBarProps {
  func?: string;
  searchClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  func = "書籍検索",
  searchClick,
}) => {
  const [searchName, setSearchName] = useState("");

  const onSearch = () => {
    console.log("検索ボタンが押されました");
    // ここに検索処理を書く
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
          onClick={searchClick}
        />
      </div>
    </div>
  );
};
