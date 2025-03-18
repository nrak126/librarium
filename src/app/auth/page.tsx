"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import styles from "./auth.module.scss";
import { useRouter } from "next/navigation";

export default function Page() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setSignIn(true);
    console.log("SignInボタンが押されました", signIn);
    router.push("/");
  };

  const handleSignUp = () => {
    setSignUp(true);
    console.log("SignUpボタンが押されました", signUp);
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

      <button onClick={handleSignIn} className={styles.signInBtn}>
        サインイン
      </button>

      <button onClick={handleSignUp} className={styles.signUpBtn}>
        サインアップ
      </button>
    </div>
  );
}
