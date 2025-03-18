"use client";
import React, { useState } from "react";
import style from "./index.module.scss";
import { Icon } from "@iconify/react";

export const SearchBar: React.FC = () => {
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
          placeholder="書籍検索"
          value={searchName}
          className={style.searchBar}
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <Icon
          icon="bi:search"
          className={style.searchIcon}
          onClick={onSearch}
        />
      </div>
    </div>
  );
};
