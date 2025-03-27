"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import styles from "./AuthPage.module.scss";
import { useRouter } from "next/navigation";

// import { auth, provider } from "@/src/lib/firebase";
// import { signInWithPopup } from "firebase/auth";

export function AuthPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Googleアカウントでログイン
  const handleLogin = () => {
    setLoading(true);
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     console.log(result);
        setLoading(false);
        router.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
