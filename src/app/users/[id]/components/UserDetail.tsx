"use client";

import styles from "./UsersDetail.module.scss";
import Image from "next/image";
import { TagList } from "@/src/components/Users/TagList";
import { TagEdit } from "@/src/components/Users/TagEdit";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Btn } from "@/src/components/book/Btn";
import { LoanWithBook, User } from "@/src/types";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";
import { convertHeicToJpeg, uploadUserIcon } from "@/src/utils/fileUtils";
import LoanHistBooks from "./LentHistBools";

export default function UserDetail() {
  const [clickEditer, setClickEditer] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);
  const [hist, setHist] = useState<LoanWithBook[] | null>(null);
  const [newName, setNewName] = useState(user?.name);
  const [newstudentId, setNewstudentId] = useState(user?.studentId);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uid = params.id as string;

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
  }, [hist, uid]);

  console.log("hist", hist);

  if (!user) {
    return <LoadingBrown />;
  }

  const handleSample = async () => {
    if (!clickEditer) {
      setNewName(user.name);
      setNewstudentId(user.studentId);
    } else {
      let updatedUser = user;
      let hasChanged = false;

      if (newName && newName !== user.name) {
        updatedUser = { ...updatedUser, name: newName };
        hasChanged = true;
      }
      if (newstudentId && newstudentId !== user.studentId) {
        updatedUser = { ...updatedUser, studentId: newstudentId };
        hasChanged = true;
      }

      if (hasChanged) {
        setUser(updatedUser);
        // ログインユーザー自身の情報を更新している場合は、logedInUserAtomも更新
        if (user.uid === logedInUser?.uid) {
          setLogedInUser(updatedUser);
        }
      }
      // サーバーにも反映
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.uid}`, {
        method: "POST",
        body: JSON.stringify(updatedUser),
        headers: { "Content-Type": "application/json" },
      });
    }
    setClickEditer(!clickEditer);
    console.log(`ClickEdit ${clickEditer}`);
    console.log("編集が押されました。");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      let fileToUpload = file;

      // HEICファイルの場合はJPEGに変換
      if (file.type === "image/heic") {
        fileToUpload = await convertHeicToJpeg(file);
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("uid", user.uid);

      const iconUrl = await uploadUserIcon(fileToUpload, user.uid);
      if (iconUrl) {
        const updatedUser = { ...user, icon: iconUrl };
        setUser(updatedUser);

        // ログインユーザー自身の情報を更新している場合は、logedInUserAtomも更新
        if (user.uid === logedInUser?.uid) {
          setLogedInUser(updatedUser);
        }
      }
    } catch {
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setUploadLoading(false);
    }
  };
  const handleIcon = () => {
    if (clickEditer === true) {
      console.log("アイコンがクリックされました。");
      fileInputRef.current?.click();
    }
  };

  const handleBack = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${uid}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    // ログインユーザー自身の情報を更新している場合は、logedInUserAtomも更新
    if (user.uid === logedInUser?.uid) {
      setLogedInUser(user);
    }

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
        onClick={handleIcon}
      />
      {/* 隠しinputファイル選択 */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      {user.uid === logedInUser?.uid ? (
        clickEditer ? (
          uploadLoading ? (
            <button className={styles.loadingButton} disabled>
              画像アップロード中...
            </button>
          ) : (
            <button onClick={handleSample} className={styles.confirmButton}>
              完了
            </button>
          )
        ) : (
          <button onClick={handleSample} className={styles.editbutton}>
            編集
          </button>
        )
      ) : null}

      <div className={styles.username}>
        <p className={styles.subtitle}>名前</p>
      </div>
      <div className={styles.nameWrapper}>
        {clickEditer ? (
          <input
            type="text"
            value={newName}
            className={styles.name}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        ) : (
          <p className={styles.name}>{user.name}</p>
        )}
      </div>

      <div className={styles.studentId}>
        <p className={styles.subtitle}>学籍番号</p>
      </div>
      <div className={styles.idWrapper}>
        {clickEditer ? (
          <input
            type="text"
            pattern="^[a-zA-Z0-9]+$"
            value={newstudentId}
            className={styles.id}
            onChange={(e) => {
              setNewstudentId(e.target.value);
            }}
          />
        ) : (
          <p className={styles.id}>{user.studentId}</p>
        )}
      </div>

      <div className={styles.taglist}>
        <div className={styles.subtitle}>タグ</div>
        {clickEditer ? (
          <TagEdit user={user} setUser={setUser} />
        ) : (
          <TagList user={user} />
        )}
      </div>

      <div className={styles.history}>
        <p className={styles.subtitle}>履歴</p>
        <div className={styles.histlist}>
          {hist && hist?.length === 0 ? (
            <div className={styles.noRental}>
              借りたことのある本がありません
            </div>
          ) : (
            <LoanHistBooks hists={hist} />
          )}
        </div>
      </div>
      <div className={styles.backbutton}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </div>
  );
}
