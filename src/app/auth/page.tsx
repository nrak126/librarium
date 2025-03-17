"use client";

import { useState } from "react";

export default function Page() {
  const [signIn, setSignIn] = useState(false);

  const SignIn = () => {
    setSignIn(true);
    console.log("useState", signIn);
  };
  return (
    <>
      <button
        onClick={SignIn}
        style={{
          border: "2px solid #635038",
          borderRadius: 30,
          color: "#635038",
          position: "absolute",
          left: "20%",
          width: "60%",
          height: "4%",
          top: "50%",
          fontWeight: "bold",
        }}
      >
        サインイン
      </button>
      <button
        onClick={SignIn}
        style={{
          border: "2px solid #635038",
          borderRadius: 30,
          color: "#635038",
          position: "absolute",
          left: "20%",
          width: "60%",
          height: "4%",
          top: "57%",
          fontWeight: "bold",
        }}
      >
        サインアップ
      </button>
    </>
  );
}
