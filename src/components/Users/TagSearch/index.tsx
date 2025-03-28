import styles from "../UsersList/index.module.scss";
import Image from "next/image";
import Icon from "@/public/icon.svg";

type User = {
  usernum: number;
  icon: string;
  num: string;
  name: string;
  level: number;
  tag: string[];
};

export function TagSearch({ result }: { result: User[] }) {
  return (
    <>
      <div className={styles.all}>
        {result.map((data, index) => {
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
                    {data.num + " " + data.name}
                  </div>
                  <div className={styles.level}>Lv.{data.level}</div>
                </div>

                <div className={styles.tagComp}>
                  {data.tag.slice(0, 4).map((tagdata, index) => {
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
