"use client";

import { useState } from "react";
import  Image  from "next/image";
import Icon from "@/public/icon.svg";

export default function Page() {
  const [signIn, setSignIn] = useState(false);

  const SignIn = () => {
    setSignIn(true);
    console.log("useState", signIn);
  };
  return (
    <div
      style={{
        background: "#FFFBF5",
        display: "flex",
        height: "100vh",
        width: "100hv",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <img
        src="/icon.svg"
        alt="icon"
        style={{
          marginTop: "15%",
          marginBottom: "50%",
          width: "55%",
          height: "25%",
        }}
      /> */}
      <Image src={Icon} alt={'librariumのアイコン'} width={210} height={210} />
      <button
        onClick={SignIn}
        style={{
          border: "2px solid #635038",
          borderRadius: 30,
          color: "#635038",
          height: "38px",
          width: "65%",
          marginBottom: "7%",
          background: "#FFFBF5",
          boxShadow: "1px 1px 4px gray",
          fontWeight: "bold",
          fontSize: "20px",
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
          left: "20%",
          width: "65%",
          height: "38px",
          background: "#FFFBF5",
          boxShadow: "1px 1px 4px gray",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        サインアップ
      </button>
    </div>
  );
}
