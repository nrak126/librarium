"use client";
import { useState, useEffect } from "react";
import Icon from "@/public/icon.svg";
import styles from "./register.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { supabase } from "@/src/lib/supabase";
import { User as SupaUser } from "@supabase/supabase-js";
import { User } from "@/src/types";

export default function Page() {
  const [enter, setEnter] = useState(false);
  const router = useRouter();

  const [supaUser, setSupaUser] = useState<SupaUser | null>(null);
  const [user, setUser] = useState<User | null>({
    id: "",
    created_at: new Date().toISOString(),
    role: "",
    tags: [],
    uid: "",
    name: "",
    studentId: "",
    email: "",
    icon: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setSupaUser(data.user); // ユーザー情報をセット
        setUser((prev) => ({
          ...prev,
          id: data.user.id,
          created_at: new Date().toISOString(),
          role: "user", // 必要に応じて変更
          tags: [],
          uid: data.user.id,
          name: data.user.user_metadata?.name || "",
          studentId: "",
          email: data.user.email || "",
          icon: data.user.user_metadata?.avatar_url || "",
        }));
        console.log("Logged-in user:", data.user);
      }
    };
    fetchUser();
  }, []);

  const handleEnter = async () => {
    setEnter(true);
    console.log("useState", enter);
    if (!user) {
      console.error("User not found");
      return;
    }
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    await router.push("/");
  };

  return (
    <div className={styles.whole}>
      <Image
        src={Icon}
        alt={"librariumのアイコン"}
        width={230}
        height={230}
        className={styles.icon}
      />

      <div className={styles.formName}>
        <label className={styles.name}>氏名</label>
        <input
          className={styles.inputName}
          type="text"
          value={user?.name || ""}
          onChange={(e) => {
            setUser((prev) => ({
              ...prev!,
              name: e.target.value,
            }));
          }}
        />
      </div>

      <div className={styles.formNum}>
        <label className={styles.number}>学籍番号</label>
        <input
          className={styles.inputNum}
          type="text"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev!,
              studentId: e.target.value,
            }));
          }}
          placeholder="k12345"
        />
      </div>

      <button className={styles.btn} onClick={handleEnter}>
        決定
      </button>
    </div>
  );
}
