"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./PageClient.module.scss";
import UsersList from "@/src/components/Users/UsersList";
import UserData from "@/src/components/Users/UserData";
import { createClient } from "@supabase/supabase-js";
import type { User } from "@/src/types";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const PageClient = () => {
  const [, setUsers] = useState<User[]>([]);
  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);
  const [result, setResult] = useState<User[]>([]);
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchWordClick, setSearchWordClick] = useState(false);

  // 初期データ取得＋localStorage読み込み
  useEffect(() => {
    (async () => {
      try {
        // ------- ログインユーザー取得（ローカルストレージ優先） -------
        const storedUser = localStorage.getItem("loginUser");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setLogedInUser(parsedUser); // ← すぐ反映
        } else {
          const { data, error } = await supabase.auth.getUser();
          if (error || !data.user?.id) {
            console.log("ログインユーザーが取得できません");
          } else {
            const res = await fetch(`/api/users/${data.user.id}`);
            if (res.ok) {
              const userData: User = await res.json();
              setLogedInUser(userData);
              localStorage.setItem("loginUser", JSON.stringify(userData));
            } else {
              console.log("ログインユーザーの取得に失敗しました");
            }
          }
        }

        // ------- ユーザー一覧取得（ローカルストレージ優先） -------
        const cachedUsers = localStorage.getItem("users");
        let usersData: User[] = [];

        if (cachedUsers) {
          usersData = JSON.parse(cachedUsers);
          if (Array.isArray(usersData)) {
            setUsers(usersData);
            setResult(usersData);
          }
        }

        if (!cachedUsers || usersData.length === 0) {
          const usersRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
          );
          if (usersRes.ok) {
            usersData = await usersRes.json();
            setUsers(usersData);
            setResult(usersData);
            localStorage.setItem("users", JSON.stringify(usersData));
          } else {
            console.log("ユーザー一覧の取得に失敗しました");
          }
        }
      } catch (err) {
        console.error("初期データ取得中にエラー:", err);
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>利用者一覧</div>
        <div className={styles.bar}>
          <SearchBar
            func="ユーザー検索"
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

      {/* UsersList に必ず配列を渡す */}
      <UsersList users={result} />
    </>
  );
};
