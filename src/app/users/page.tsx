"use client";

import { useState, useEffect } from "react";
import styles from "./users.module.scss";
import { SearchBar } from "../../components/SearchBar";
import UsersList from "../../components/Users/usersList";
import UserDate from "@/src/components/Users/userData";
import { TagSearch } from "@/src/components/Users/TagSearch";
import sampleData from "@/src/components/Users/sampleData";

type User = {
  usernum: number;
  icon: string;
  num: string;
  name: string;
  level: number;
  tag: string[];
};

export default function Page() {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState<User[]>([]);
  const [searchWordClick, setSearchWordClick] = useState(false);

  useEffect(() => {
    if (searchWordClick === true) {
      const filteredUsers = sampleData.filter((user) =>
        user.tag.includes(searchName)
      );
      setResult(filteredUsers);

      console.log(`検索ワード：${searchName}`);
      console.log(result);

      setSearchWordClick(false);
    }
  }, [searchWordClick]);

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
