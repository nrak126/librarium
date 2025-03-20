"use client";

import styles from "./users.module.scss";
import { SearchBar } from "../../components/SearchBar/index";
import UsersId from "../../components/Users/index";

export default function Page() {
  return (
    <>
      <div className={styles.whole}>
        <div className={styles.title}>利用者一覧</div>

        <div className={styles.bar}>
          <SearchBar func={"ユーザー検索"} />
        </div>
      </div>

      <div className={styles.myprofile}>MY PROFILE</div>

      <div>
        <UsersId />
      </div>

      {/* <div className={styles.userProfile}>
        <div className={styles.icon}>アイコン</div>
        <div className={styles.numname}>学生番号名前</div>
        <div className={styles.level}>Lv.1</div>
        <div className={styles.tag}>#フロントビギナー</div>
      </div> */}
    </>
  );
}
