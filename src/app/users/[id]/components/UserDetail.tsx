"use client";

import styles from "./UsersDetail.module.scss";
import Image from "next/image";
import { TagList } from "@/src/components/Users/TagList";
import { TagEdit } from "@/src/components/Users/TagEdit";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Btn } from "@/src/components/book/Btn";
import { User } from "@/src/types";
import { usePathname } from "next/navigation";

export default function UserDetail() {
  const [clickEditer, setClickEditer] = useState(false);
  const router = useRouter();
  const [User, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const uid = pathArr[pathArr.length - 1];

  useEffect(() => {
    (async () => {
      const UserDataRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${uid}`
      );
      const UserData: User = await UserDataRes.json();
      setUser(UserData);
    })();
  }, [uid]);

  if (!User) {
    return;
  }

  const handleSample = () => {
    setClickEditer(!clickEditer);
    console.log(`ClickEdit ${clickEditer}`);
    console.log("編集が押されました。");
  };

  const handleBack = () => {
    console.log("Backが押されました。");
    router.back();
    return;
  };

  return (
    <div className={styles.whole}>
      <Image
        src={User.icon}
        alt={"ユーザーのアイコン"}
        width={180}
        height={180}
        className={styles.icon}
        priority
      />

      <div className={styles.username}>
        {User.studentId} {User.name}
      </div>

      <div className={styles.tagediter}>
        <div className={styles.tag}>タグ</div>
        {clickEditer ? (
          <button onClick={handleSample} className={styles.editbutton}>
            編集
          </button>
        ) : (
          <button onClick={handleSample} className={styles.editbutton}>
            完了
          </button>
        )}
      </div>

      {clickEditer ? <TagList user={User} /> : <TagEdit user={User} />}

      <div className={clickEditer ? styles.trueexp : styles.falseexp}>
        現在の経験値
      </div>

      <div className={styles.progressbar}>
        <progress max="97" value="{User.exp}%10">
          <p>50%</p>
        </progress>
      </div>

      <div className={styles.backbutton}>
        <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </div>
  );
}
