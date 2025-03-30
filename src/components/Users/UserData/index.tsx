import styles from "./index.module.scss";
import Image from "next/image";
import { User } from "@/src/types";

function UserData({ user }: { user: User | null }) {
  if (!user) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className={styles.all}>
        <div className={styles.whole}>
          <Image
            src={user.icon}
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
    </>
  );
}

export default UserData;
