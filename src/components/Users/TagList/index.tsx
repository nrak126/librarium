import styles from "./index.module.scss";
import { tagData } from "../tagData";

export function TagList() {
  return (
    <>
      {tagData.map((data, index) => {
        return (
          <div key={index} className={styles.tag}>
            #{data}
          </div>
        );
      })}
    </>
  );
}
