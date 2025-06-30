import styles from "./index.module.scss";
import Image from "next/image";
import { User } from "@/src/types";
import Link from "next/link";
import LoadingBrown from "../../LoadingBrown";
import icon from "@/public/icon.svg";

import { Changa_One } from "next/font/google";

// Alegreya Sans SC（Italicあり, Weight全指定）
export const alegreyaSansSC = Changa_One({
  weight: "400",
  subsets: ["latin"],
});

function UserData({ user }: { user?: User | null }) {
  if (!user) return <LoadingBrown />;

  return (
    // ユーザー詳細ページへリンク
    <Link href={`users/${user.uid}`} className={styles.link}>
      <div className={styles.all}>
        <div className={styles.whole}>
          <Image
            src={user.icon || icon}
            alt={"ユーザーアイコン"}
            width={57}
            height={57}
            className={styles.icon}
          />
          <div className={styles.sub}>
            {/* 学籍番号と名前を表示 */}
            <div className={styles.component}>
              <div className={styles.numname}>
                {/* レベル表示。Google Fontsのクラスとスタイルを組み合わせて装飾 */}
                {user.studentId + " " + user.name}
              </div>
              <div className={`${alegreyaSansSC.className} ${styles.level}`}>
                Lv.{user.level}
              </div>
            </div>
            {/* タグを最大4つまで表示。タグにはハッシュマークを付けて表示 */}
            <div className={styles.tagComp}>
              {user.tags.map((tagdata, index) => (
                <div key={index} className={styles.tag}>
                  #{tagdata}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserData;
