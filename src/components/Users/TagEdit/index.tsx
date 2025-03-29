import styles from "./index.module.scss";
import { tagData } from "../tagData";

export function TagEdit() {
  const handleDelete = () => {
    console.log("削除ボタンが押されました。");
  };

  const handleAdd = () => {
    console.log("追加ボタンが押されました");
  };
  return (
    <>
      <div className={styles.taglist}>
        {tagData.map((data, index) => {
          return (
            <div key={index}>
              <div className={styles.tag}>
                #{data}
                <button onClick={handleDelete} className={styles.delete}>
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
            <select name="" id="" className={styles.tagbox}>
              <option value=""></option>
              <option value="front">front</option>
              <option value="Next.js">Next.js</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="Unity">Unity</option>
              <option value="CSS">CSS</option>
            </select>
          </div>
        </div>

        <div className={styles.levelselect}>
          <div className={styles.levelafter}>
            <select name="" id="">
              <option value=""></option>
              <option value="初心者">初心者</option>
              <option value="上級者">上級者</option>
              <option value="チョットデキテル">チョットデキテル</option>
              <option value="エキスパート">エキスパート</option>
              <option value="中級者">中級者</option>
              <option value="Hello Worldの住人">Hello Worldの住人</option>
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
