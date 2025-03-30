import { BookInfo } from "@/src/components/book/BookInfo";
import { Book } from "@/src/types";
import styles from "./components/return.module.scss";
import { ReturnBtn } from "./components/ReturnBtn";


export default async function Page() {
  return (
    <>
      {/* <BookInfo book={book} /> */}
      <p className={styles.Deadline}>この本の返却期限は</p>
      <p className={styles.Day}>2025/03/31</p>
			{/* <ReturnBtn book={book} /> */}
    </>
  );
}
