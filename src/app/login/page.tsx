"use client";
import { signInWithPopup } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, provider } from "@/src/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Page() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </>
  );
}

//googleでサインイン
function SignInButton() {
  const signInWithGoogle = () => {
    //firebaseを使ってGoogleでサインインする
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>Sign in</button>;
}

//googleでサインアウト
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UserInfo() {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL ?? null);
      setDisplayName(auth.currentUser.displayName ?? "Anonymous");
    }
  }, []);

  if (!isClient) {
    return null; // クライアントサイドでのみレンダリング
  }

  return (
    <>
      <Image
        src={photoURL ?? "@/public/next.svg"}
        alt="User Avatar"
        width={96}
        height={96}
      />
      <p>{displayName}</p>
    </>
  );
}
