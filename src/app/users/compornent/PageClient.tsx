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
  const [users, setUsers] = useState<User[]>([]);
  const [logedInUser, setLogedInUser] = useState<User | null>(null);
  const [result, setResult] = useState<User[]>([]);
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search") || "";

  // 初期データ取得＋localStorage読み込み
  useEffect(() => {
    (async () => {
      try {
        const cachedUsers = localStorage.getItem("users");
        if (cachedUsers) {
          const parsedUsers: User[] = JSON.parse(cachedUsers);
          if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
            setResult(parsedUsers);
          }
        }

        if (users.length === 0) {
          const usersRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
          );
          if (usersRes.ok) {
            const usersData: User[] = await usersRes.json();
            setUsers(usersData);
            setResult(usersData);
            localStorage.setItem("users", JSON.stringify(usersData));
          } else {
            console.log("ユーザー一覧の取得に失敗しました");
          }
        }

        // localStorage からログインユーザー取得
        const storedUser = localStorage.getItem("loginUser");

        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setLogedInUser(parsedUser);
        } else {
          // Supabase から取得して localStorage に保存
          const { data, error } = await supabase.auth.getUser();
          if (error || !data.user?.id) {
            console.log("ログインユーザーが取得できません");
            return;
          }

          const res = await fetch(`/api/users/${data.user.id}`);
          if (res.ok) {
            const userData: User = await res.json();
            setLogedInUser(userData);
            localStorage.setItem("loginUser", JSON.stringify(userData));
          } else {
            console.log("ログインユーザーの取得に失敗しました");
          }
        }
      } catch (err) {
        console.error("初期データ取得中にエラー:", err);
      }
    })();
  }, []);

  // Supabase リアルタイム購読で新規ユーザーを即時反映
  useEffect(() => {
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload) => {
          const newUser = payload.new as User;
          setUsers((prev) => {
            const updated = [...prev, newUser];
            localStorage.setItem("users", JSON.stringify(updated));
            return updated;
          });
          setResult((prev) => [...prev, newUser]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
        if (!users) return;
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
