"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./PageClient.module.scss";
import UsersList from "@/src/components/Users/UsersList";
import UserDate from "@/src/components/Users/UserData";
import { User } from "@/src/types";

// type User = {
//   usernum: number;
//   icon: string;
//   num: string;
//   name: string;
//   level: number;
//   tag: string[];
// };

export function PageClient({ users }: { users: User[] }) {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState<User[]>([]);

  const [searchWordClick, setSearchWordClick] = useState(false);
  // let searchWordClick: Boolean | undefined = false;

  useEffect(() => {
    if (searchWordClick === true) {
      const filteredUsers = users.filter((user) =>
        user.tags.includes(searchName)
      );
      setResult(filteredUsers);

      console.log(`検索ワード：${searchName}`);
    } else {
      setResult(users);
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
        <div className={styles.titleSearch}>SEARCH</div>
      ) : (
        <div className={styles.titleAll}>ALL</div>
      )}
      <UsersList users={result} />
    </>
  );
}
