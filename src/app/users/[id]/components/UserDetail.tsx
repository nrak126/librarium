"use client";

import styles from "./UsersDetail.module.scss";
import Image from "next/image";
import { TagList } from "@/src/components/Users/TagList";
import { TagEdit } from "@/src/components/Users/TagEdit";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Btn } from "@/src/components/book/Btn";
import { LoanWithBook, User } from "@/src/types";
import { useAtom } from "jotai";
import { histAtom, logedInUserAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";
import { BookCard } from "@/src/components/book/BookCard";

export default function UserDetail() {
  const [clickEditer, setClickEditer] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [logedInUser] = useAtom(logedInUserAtom);
  const [hist, setHist] = useAtom(histAtom);

  const uid = params.id as string;

  console.log("user", user);

  // ユーザーのuidの取得
  useEffect(() => {
    if (!uid) return;

    (async () => {
      try {
        const res = await fetch(`/api/users/${uid}`);
        if (!res.ok) {
          console.warn("ユーザーデータの取得に失敗");
          return;
        }
        const fetchedUser: User = await res.json();
        setUser(fetchedUser);
      } catch (err) {
        console.error("ユーザーデータ取得エラー:", err);
      }
    })();
  }, [uid]);

  console.log("user,uid", uid);
  useEffect(() => {
    if (hist === null) {
      (async () => {
        try {
          const histBook = await fetch(`/api/users/loanHist?uid=${uid}`);
          const data: LoanWithBook[] = await histBook.json();
          setHist(data);
        } catch (error) {
          console.error("ヒストブックデータの取得エラー:", error);
        }
      })();
    }
  }, [hist, setHist]);

  if (!user) {
    return <LoadingBrown />;
  }

  const handleSample = () => {
    setClickEditer(!clickEditer);
    console.log(`ClickEdit ${clickEditer}`);
    console.log("編集が押されました。");
  };

  const handleHistBook = (book: LoanWithBook["books"]) => {
    router.push(`/books/${book.isbn}`);
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

      <div className={styles.username}>
        <div className={styles.subtitle}>名前</div>
        <div className={styles.name}>{user.name}</div>
      </div>

      <div className={styles.studentId}>
        <div className={styles.subtitle}>学籍番号</div>
        <div className={styles.id}>{user.studentId}</div>
      </div>

      <div className={styles.taglist}>
        <div className={styles.tag}>タグ</div>
      </div>

      {clickEditer ? (
        <TagEdit user={user} setUser={setUser} />
      ) : (
        <TagList user={user} />
      )}

      <div className={styles.history}>
        <div className={styles.subtitle}>履歴</div>
        <div className={styles.histlist}>
          {hist?.length === 0 ? (
            <div className={styles.noRental}>借りた本はありません</div>
          ) : (
            hist?.map((item, index) =>
              item?.books ? (
                <div
                  className={styles.card}
                  key={index}
                  onClick={() => handleHistBook(item.books)}
                >
                  <BookCard book={item.books} width={100} height={130} />
                </div>
              ) : null
            )
          )}
        </div>
      </div>

      <div className={styles.backbutton}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </div>
  );
}
