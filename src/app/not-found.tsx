"use client";

import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>ページが見つかりません</h2>
      <p className={styles.description}>
        申し訳ありませんが、お探しのページは存在しないか、<br />
        移動した可能性があります。
      </p>
      <Link href="/" className={styles.link}>
        ホームに戻る
      </Link>
    </div>
    );
}
