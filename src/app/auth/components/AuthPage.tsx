"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import styles from "./AuthPage.module.scss";
import { useRouter } from "next/navigation";

import { supabase } from "@/src/lib/supabase";

export function AuthPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Googleアカウントでログイン
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      },
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("User logged in:", data);
    }
  };

  return (
    <div className={styles.whole}>
      <Image
        src={Icon}
        alt={"librariumのアイコン"}
        width={230}
        height={230}
        className={styles.icon}
        priority
      />

      <button
        onClick={handleLogin}
        className={styles.loginBtn}
        disabled={loading}
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </div>
  );
}
