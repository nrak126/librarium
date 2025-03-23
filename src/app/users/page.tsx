"use client";

import { useState } from "react";
import styles from "./users.module.scss";
import { SearchBar } from "../../components/SearchBar/index";
import UsersList from "../../components/Users/usersList";
import UserDate from "@/src/components/Users/userData";

export default function Page() {
  const [searchCilck, setSearchCilck] = useState(false);

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>利用者一覧</div>
        <div className={styles.bar}>
          <SearchBar
            func={"ユーザー検索"}
            clickBy="usersSearch"
            searchCilck={searchCilck}
            setSearchCilck={setSearchCilck}
          />
        </div>
      </div>

      <div className={styles.myprofile}>MY PROFILE</div>

      <UserDate />

      {searchCilck ? (
        <div className={styles.titleSearch}>SEARCH</div>
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
