"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import styles from "./auth.module.scss";
import { useRouter } from "next/navigation";

import { auth, provider } from "@/src/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    //ログイン完了
    setLogin(true);
    setLoading(false);
    console.log("loginボタンが押されました", login);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    // router.push("/");
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
