import styles from "./index.module.scss";
import { User } from "@/src/types";

export function TagList({ user }: { user: User | null }) {
  if (!user) return;
  return (
    <>
      <div className={styles.taglist}>
        {user.tags.map((data, index) => {
          return (
            <div key={index} className={styles.tag}>
              #{data}
            </div>
          );
        })}
      </div>
    </>
  );
}
