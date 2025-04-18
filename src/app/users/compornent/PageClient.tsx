"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./PageClient.module.scss";
import UsersList from "@/src/components/Users/UsersList";
import UserData from "@/src/components/Users/UserData";
import { User } from "@/src/types";
import { supabase } from "@/src/lib/supabase";

export function PageClient() {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [searchWordClick, setSearchWordClick] = useState(false);
  // let searchWordClick: Boolean | undefined = false;
  const [logedInUser, setLogedInUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const usersRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
      );
      const usersData: User[] = await usersRes.json();
      setUsers(usersData);

      const logedInUserSupa = await supabase.auth.getUser();
      const { data, error } = logedInUserSupa;
      if (error) {
        console.log("ログイン中のユーザのデータを取得できませんでした。");
        return;
      }
      const uid = data.user.id;
      const logedInUserRes = await fetch(
        `api/users/${uid}`
      );
      const logedInUserData: User = await logedInUserRes.json();
      setLogedInUser(logedInUserData);
    })();
  }, []);

  useEffect(() => {
    if (searchWordClick === true) {
      const filteredUsers = users.filter((user) =>
        user.tags.includes(searchName)
      );
      setResult(filteredUsers);
    } else {
      setResult(users);
    }
  }, [searchWordClick, users, searchName]); // result は依存関係に追加しない

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
      <UserData user={logedInUser} />
      {searchClick ? (
        <div className={styles.titleSearch}>SEARCH</div>
      ) : (
        <div className={styles.titleAll}>ALL</div>
      )}
      <UsersList users={result} />
    </>
  );
}
