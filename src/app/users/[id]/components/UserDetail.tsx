"use client";

import styles from "./UsersDetail.module.scss";
import Image from "next/image";
import { TagList } from "@/src/components/Users/TagList";
import { TagEdit } from "@/src/components/Users/TagEdit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/src/components/book/Btn";
import { User } from "@/src/types";
import { useAtom } from "jotai";
import { uidAtom } from "@/src/atoms/atoms"; // 作成したuidAtomをインポート
import { logedInUserAtom } from "@/src/atoms/atoms";

export default function UserDetail() {
  const [clickEditer, setClickEditer] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useAtom(uidAtom); // uidAtom を使用
  const [logedInUser] = useAtom(logedInUserAtom);

  const pathname = window.location.pathname;
  const pathArr = pathname.split("/");
  const currentUid = pathArr[pathArr.length - 1];
  setUid(currentUid);

  useEffect(() => {
    if (!uid) return; // uid が無ければ何もしない

    const cached = localStorage.getItem(`users-${uid}`);
    if (cached) {
      try {
        const parsed: User = JSON.parse(cached);
        setUser(parsed);
      } catch (e) {
        console.error("ユーザーデータのパースに失敗:", e);
      }
    }

    // ネットワークから最新データ取得
    (async () => {
      try {
        const res = await fetch(`/api/users/${uid}`);
        if (!res.ok) {
          console.warn("ユーザーデータの取得に失敗");
          return;
        }

        const fetchedUser: User = await res.json();
        setUser(fetchedUser);

        // localStorage にキャッシュ
        localStorage.setItem(`users-${uid}`, JSON.stringify(fetchedUser));
      } catch (err) {
        console.error("ユーザーデータ取得エラー:", err);
      }
    })();
  }, [uid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSample = () => {
    setClickEditer(!clickEditer);
    console.log(`ClickEdit ${clickEditer}`);
    console.log("編集が押されました。");
  };

  const handleBack = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${uid}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Backが押されました。");
    await router.back();
    return;
  };

  return (
    <div className={styles.whole}>
      <Image
        src={user.icon}
        alt={"ユーザーのアイコン"}
        width={180}
        height={180}
        className={styles.icon}
        priority
      />

      <div className={styles.username}>
        {user.studentId} {user.name}
      </div>

      <div className={styles.tagediter}>
        <div className={styles.tag}>タグ</div>
        {user.uid === logedInUser?.uid ? (
          clickEditer ? (
            <button onClick={handleSample} className={styles.editbutton}>
              完了
            </button>
          ) : (
            <button onClick={handleSample} className={styles.editbutton}>
              編集
            </button>
          )
        ) : null}
      </div>

      {clickEditer ? (
        <TagEdit user={user} setUser={setUser} />
      ) : (
        <TagList user={user} />
      )}

      <div className={clickEditer ? styles.trueexp : styles.falseexp}>
        現在の経験値
      </div>

      <div className={styles.percent}>
        <p className={styles.comment}>1冊借りると+3pt</p>
        <p className={styles.zero}>0</p>
        <p className={styles.five}>5</p>
        <p className={styles.ten}>10</p>
      </div>

      <div className={styles.progressbar}>
        <progress max="10" value={user.exp % 10}>
          <p>50%</p>
        </progress>
      </div>

      <div className={styles.backbutton}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </div>
  );
}
