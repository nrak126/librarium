import Loading from "../../Loading";
import styles from "./index.module.scss";
import { useState } from "react";
import { User } from "@/src/types";
import {
  nameTagList,
  levelTagList,
  splitUserAllTags,
} from "@/src/utils/spritUserTag";

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
    if (selectedTag && selectedLevel) {
      const newTag = selectedTag + selectedLevel;
      const allTags = splitUserAllTags(user.tags);
      console.log("allTags", allTags);

      // 同じnameのタグがあるかチェックして処理
      let hasExistingTag = false;
      let newTags = user.tags;

      allTags.map((tag) => {
        if (tag.name === selectedTag) {
          hasExistingTag = true;
          const oldTag = tag.name + tag.level;
          console.log("既存のタグを削除:", oldTag);

          // 古いタグを除外した新しい配列を作成
          newTags = user.tags.filter((t) => t !== oldTag);
          console.log("フィルター後のタグ:", newTags);
        }
      });

      if (hasExistingTag) {
        // 同じnameのタグがあった場合、削除後に新しいタグを追加
        newTags = [...newTags, newTag];
        setUser({ ...user, tags: newTags });
        console.log("既存タグを削除して新しいタグを追加:", newTags);
      } else {
        // 同じnameのタグがない場合、そのまま追加
        newTags = [...user.tags, newTag];
        setUser({ ...user, tags: newTags });
        console.log("新しいタグを追加:", newTags);
      }

      setSelectedTag("");
      setSelectedLevel("");
    } else {
      console.log("タグとレベルを選択してください。");
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
