"use client";

import Image from "next/image";
import Icon from "@/public/icon.svg";
import styles from "./AuthPage.module.scss";

import { supabase } from "@/src/lib/supabase";

export function AuthPage() {
  // Googleアカウントでログイン
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("User logged in:", data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.whole}>
        <Image
          src={Icon}
          alt={"librariumのアイコン"}
          width={150}
          height={150}
          className={styles.icon}
          priority
        />

        <button onClick={handleLogin} className={styles.loginBtn}>
          {"ログイン"}
        </button>
      </div>
    </div>
  );
}
