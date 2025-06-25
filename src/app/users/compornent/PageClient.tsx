"use client";

import { useState, useEffect, Suspense } from "react";
import SearchBar from "@/src/components/SearchBar";
import styles from "./PageClient.module.scss";
import UsersList from "@/src/components/Users/UsersList";
import UserData from "@/src/components/Users/UserData";
import { createClient } from "@supabase/supabase-js";
import type { User } from "@/src/types";
import { useSearchParams } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";
import { useAtom } from "jotai";
import { logedInUserAtom, usersAtom } from "@/src/atoms/atoms";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const PageClient = () => {
  return (
    <Suspense fallback={<LoadingBrown />}>
      <PageContent />
    </Suspense>
  );
};

const PageContent = () => {
  const [users, setUsers] = useAtom<User[]>(usersAtom);
  const [logedInUser] = useAtom<User | null>(logedInUserAtom);
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search") || "";
  const [result, setResult] = useState<User[]>([]);

  // 初期データ取得（空の場合のみ）+ リアルタイム更新
  useEffect(() => {
    const fetchInitialData = async () => {
      // usersが空の場合のみ初回データを取得
      if (users.length === 0) {
        try {
          const { data, error } = await supabase.from("users").select("*");
          if (error) {
            console.error("ユーザー一覧の取得に失敗しました:", error);
          } else {
            setUsers(data || []);
            setResult(data || []);
          }
        } catch (err) {
          console.error("初期データ取得中にエラー:", err);
        }
      }
    };

    // 初回データ取得を実行
    fetchInitialData();

    // リアルタイム購読設定
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload) => {
          const newUser = payload.new as User;
          setUsers((prev) => [...prev, newUser]);
          setResult((prev) => [...prev, newUser]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          const updatedUser = payload.new as User;
          setUsers((prev) =>
            prev.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          setResult((prev) =>
            prev.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        (payload) => {
          const deletedUser = payload.old as User;
          setUsers((prev) => prev.filter((user) => user.id !== deletedUser.id));
          setResult((prev) =>
            prev.filter((user) => user.id !== deletedUser.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // 空の依存配列でマウント時のみ実行

  // 検索フィルタリング処理
  useEffect(() => {
    (async () => {
      if (searchName) {
        const fetchFilteredBooks = await fetch(
          `/api/users?search=${searchName}`
        );
        const filteredBooks: User[] = await fetchFilteredBooks.json();
        setResult(filteredBooks);
      } else {
        setResult(users);
      }
    })();
  }, [searchName, users]);

  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>利用者一覧</div>
        <div className={styles.bar}>
          <SearchBar placeholder="ユーザー検索" />
        </div>
      </div>

      <div className={styles.myprofile}>MY PROFILE</div>
      {logedInUser && <UserData user={logedInUser} />}

      {searchName ? (
        <div className={styles.titleSearch}>SEARCH</div>
      ) : (
        <div className={styles.titleAll}>ALL</div>
      )}
      <UsersList users={result} />
    </>
  );
};
