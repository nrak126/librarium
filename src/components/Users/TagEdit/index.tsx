import Loading from "../../Loading";
import styles from "./index.module.scss";
import { useState } from "react";
import { User } from "@/src/types";
import { nameTagList, levelTagList } from "@/src/utils/spritUserTag";

export function TagEdit({
  user,
  setUser,
}: {
  user: User | null;
  setUser: (user: User) => void;
}) {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  if (!user) {
    return <Loading />;
  }

  const handleDelete = (tag: string) => {
    console.log("削除ボタンが押されました。", tag);
    const newTags = user.tags.filter((t) => t !== tag);
    setUser({ ...user, tags: newTags });
    console.log("削除後のタグ", newTags);
  };

  const handleAdd = () => {
    console.log("追加ボタンが押されました");
    if (
      selectedTag &&
      selectedLevel &&
      !user.tags.includes(selectedTag + selectedLevel)
    ) {
      const newTags = [...user.tags, selectedTag + selectedLevel];
      setUser({ ...user, tags: newTags });
      setSelectedTag("");
      setSelectedLevel("");
    } else {
      console.log("タグが選択されていないか、既に存在しています。");
    }
  };
  return (
    <>
      <div className={styles.taglist}>
        {user.tags.map((data, index) => {
          return (
            <div key={index}>
              <div className={styles.tag}>
                #{data}
                <button
                  onClick={() => handleDelete(data)}
                  className={styles.delete}
                >
                  削除
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.selectbox} id="selectbox">
        <div className={styles.tagselect}>
          <div className={styles.tagafter}>
            <select
              name=""
              id=""
              className={`${styles.tagbox} ${
                selectedTag === "" ? styles.placeholder : ""
              }`}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">例:CSS</option>
              {nameTagList.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.levelselect}>
          <div className={styles.levelafter}>
            <select
              name=""
              id=""
              className={`${styles.levelbox} ${
                selectedLevel === "" ? styles.placeholder : ""
              }`}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">例:エキスパート</option>
              {levelTagList.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleAdd} className={styles.tagadd}>
          追加
        </button>
      </div>
    </>
  );
}
