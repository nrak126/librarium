import BooksList from "./components/BooksList";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./index.module.scss";

export default async function Page() {
  // ここでサーバーから初期データ取得してもいい（任意）
  //const books = await fetchBooks();

  return (
    <>
      <div>
        <div className={styles.whole}>
          <div className={styles.title}>書籍一覧</div>
          <div className={styles.bar}>
            <SearchBar />
            <div className={styles.card}>
              <div className={styles.list}>
                <BooksList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
