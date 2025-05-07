import styles from "./index.module.scss";
import Image from "next/image";
import { User } from "@/src/types";
import Link from "next/link";
import LoadingBrown from "../../LoadingBrown";
import icon from "@/public/icon.svg";

function UserData({ user }: { user: User | null }) {
  if (!user) {
    return <LoadingBrown />;
  }
  return (
    <>
      <Link legacyBehavior href={`users/${user.uid}`} className={styles.link}>
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
              <div className={styles.component}>
                <div className={styles.numname}>
                  {user.studentId + " " + user.name}
                </div>
                <div className={styles.level}>Lv.{user.level}</div>
              </div>

              <div className={styles.tagComp}>
                {user.tags.slice(0, 4).map((tagdata, index) => {
                  return (
                    <div key={index} className={styles.tag}>
                      #{tagdata}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default UserData;
