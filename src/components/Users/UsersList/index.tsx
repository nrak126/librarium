import styles from "./index.module.scss";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import { User } from "@/src/types";

function UsersList({ users }: { users: User[] }) {
  return (
    <>
      <div className={styles.all}>
        {users.map((data, index) => {
          return (
            <div key={index} className={styles.whole}>
              <Image
                src={Icon}
                alt={"librariumのアイコン"}
                width={57}
                height={57}
                className={styles.icon}
              />

              <div className={styles.sub}>
                <div className={styles.component}>
                  <div className={styles.numname}>
                    {data.studentId + " " + data.name}
                  </div>
                  <div className={styles.level}>Lv.{data.level}</div>
                </div>

                <div className={styles.tagComp}>
                  {data.tags.slice(0, 4).map((tagdata, index) => {
                    return (
                      <div key={index} className={styles.tag}>
                        #{tagdata}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UsersList;
