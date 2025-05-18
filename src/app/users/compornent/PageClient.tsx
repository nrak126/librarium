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
  const [result, setResult] = useState<User[]>([]);
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchWordClick, setSearchWordClick] = useState(false);
  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);

  // --- 初期化処理 ---
  useEffect(() => {
    (async () => {
      try {
        await loadLoginUser();
        await loadUsers();
      } catch (err) {
        console.error("初期データ取得中にエラー:", err);
      }
    })();
  }, []);

  // --- Supabase リアルタイム購読 ---
  useEffect(() => {
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload) => {
          const newUser = payload.new as User;
          setResult((prev) => {
            const updated = [...prev, newUser];
            localStorage.setItem("users", JSON.stringify(updated));
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- ログインユーザー読み込み ---
  const loadLoginUser = async () => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      setLogedInUser(JSON.parse(storedUser));
      return;
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user?.id) {
      console.log("ログインユーザーが取得できません");
      return;
    }

    // --- LocalStorageにログイン中の’userがなかったら ---
    const res = await fetch(`/api/users/${data.user.id}`);
    if (res.ok) {
      const userData: User = await res.json();
      setLogedInUser(userData);
      localStorage.setItem("loginUser", JSON.stringify(userData));
    } else {
      console.log("ログインユーザーの取得に失敗しました");
    }
  };

  // --- ユーザー一覧読み込み ---
  const loadUsers = async () => {
    const cachedUsers = localStorage.getItem("users");
    let usersData: User[] = [];

    if (cachedUsers) {
      usersData = JSON.parse(cachedUsers);
    }

    if (!cachedUsers || usersData.length === 0) {
      const usersRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
      );
      if (usersRes.ok) {
        usersData = await usersRes.json();
        localStorage.setItem("users", JSON.stringify(usersData));
      } else {
        console.log("ユーザー一覧の取得に失敗しました");
        return;
      }
    }

    setResult(usersData);
  };

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

      {/* 自分のアカウント */}
      <div className={styles.myprofile}>MY PROFILE</div>
      <UserData user={logedInUser} />

      <div className={searchClick ? styles.titleSearch : styles.titleAll}>
        {searchClick ? "SEARCH" : "ALL"}
      </div>

      {/* 利用者すべてのアカウント表示 */}
      <UsersList users={result} />
    </>
  );
};
