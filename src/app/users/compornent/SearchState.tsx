"use client";

import { useState, useEffect } from "react";
import sampleData from "@/src/components/Users/sampleData";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./SearchState.module.scss";
import { TagSearch } from "@/src/components/Users/TagSearch";
import UsersList from "@/src/components/Users/UsersList";
import UserDate from "@/src/components/Users/UserData";

type User = {
  usernum: number;
  icon: string;
  num: string;
  name: string;
  level: number;
  tag: string[];
};

export function SearchState() {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState<User[]>([]);

  const [searchWordClick, setSearchWordClick] = useState(false);
  // let searchWordClick: Boolean | undefined = false;

  useEffect(() => {
    if (searchWordClick === true) {
      const filteredUsers = sampleData.filter((user) =>
        user.tag.includes(searchName)
      );
      setResult(filteredUsers);

      console.log(`検索ワード：${searchName}`);
    }
  }, [searchWordClick, searchName]);
  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>利用者一覧</div>
        <div className={styles.bar}>
          <SearchBar
            func={"ユーザー検索"}
            clickBy="usersSearch"
            searchClick={searchClick}
            setSearchClick={setSearchClick}
            searchName={searchName}
            setSearchName={setSearchName}
            setSearchWordClick={setSearchWordClick}
            searchWordClick={searchWordClick}
          />
        </div>
      </div>
      <div className={styles.myprofile}>MY PROFILE</div>
      <UserDate />
      {searchClick ? (
        <>
          <div className={styles.titleSearch}>SEARCH</div>
          <div>
            <TagSearch result={result} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.titleAll}>ALL</div>
          <div>
            <UsersList />
          </div>
        </>
      )}
    </>
  );
}
