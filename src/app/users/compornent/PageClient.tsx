"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./PageClient.module.scss";
import UsersList from "@/src/components/Users/UsersList";
import UserData from "@/src/components/Users/UserData";
import { supabase } from "@/src/lib/supabase";
import { usersAtom, logedInUserAtom } from "@/src/atoms/atoms";
import type { User } from "@/src/types";

export function PageClient() {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchWordClick, setSearchWordClick] = useState(false);

  const [users, setUsers] = useAtom(usersAtom);
  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);
  const [result, setResult] = useState<User[]>([]);

  // 初回データ取得
  useEffect(() => {
    (async () => {
      try {
        // 全ユーザー取得
        if (!users) {
          const usersRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
          );

          if (!usersRes.ok) {
            console.log("ユーザー一覧の取得に失敗しました");
          }

          const usersData: User[] = await usersRes.json();
          setUsers(usersData);
          setResult(usersData); // 初期表示用
        } else {
          setResult(users);
        }

        // ログインユーザー取得
        if (!logedInUser) {
          const { data, error } = await supabase.auth.getUser();

          if (error || !data.user?.id) {
            console.log(
              "ログインユーザーが取得できません。未ログインの可能性があります。"
            );
            return;
          }

          const logedInUserRes = await fetch(`/api/users/${data.user.id}`);
          if (!logedInUserRes.ok) {
            console.log("ログインユーザーのAPI取得に失敗しました");
          }

          const logedInUserData: User = await logedInUserRes.json();
          setLogedInUser(logedInUserData);
        }
      } catch (err) {
        console.error("初期データ取得中にエラー:", err);
      }
    })();
  }, [users, logedInUser, setUsers, setLogedInUser]);

  // タグによるフィルタリング
  useEffect(() => {
    if (searchWordClick && users) {
      const filteredUsers = users.filter((user) =>
        user.tags.includes(searchName)
      );
      setResult(filteredUsers);
    } else if (users) {
      setResult(users);
    }
  }, [searchWordClick, users, searchName]);

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

      {logedInUser && <UserData user={logedInUser} />}
      {searchClick ? (
        <div className={styles.titleSearch}>SEARCH</div>
      ) : (
        <div className={styles.titleAll}>ALL</div>
      )}
      <UsersList users={result} />
    </>
  );
}
