import { StockState } from "@/src/components/book/StockState";
import BooksList from "./components/BooksList";
import { SearchBar } from "@/src/components/SearchBar";
import styles from "./index.module.scss";

export default async function Page() {
  // ここでサーバーから初期データ取得してもいい（任意）
  //const books = await fetchBooks();
  const isBorrowed = false;

  return (
    <>
      <div>
        <div className={styles.whole}>
          <div className={styles.title}>書籍一覧</div>
          <div className={styles.bar}>
            <SearchBar />
            <BooksList />
            <StockState isBorrowed={isBorrowed} />
          </div>
        </div>
      </div>
    </>
  );
}
