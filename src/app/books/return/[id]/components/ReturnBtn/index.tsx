"use client";

import { Btn } from "@/src/components/book/Btn";

import styles from "../return.module.scss";

export function ReturnBtn() {
  // const isAvailableReturn = book.available > 0;

  // const handleReturn = async () => {
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${book.isbn}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(book),
  //   });

  //   const logedInUserData = await supabase.auth.getUser();

  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/rental`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       isbn: book.isbn,
  //       uid: logedInUserData.data.user?.id,
  //     }),
  //   });
  // };

  const handleReturn = () => {
    window.history.back();
    //この中に返却すると返せるようにする
  };
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className={styles.back}>
        <Btn text="キャンセル" bgColor="#99C6E2" onClick={handleBack} />
      </div>
      <div className={styles.return}>
        <Btn text="返却" bgColor="#BADE99" onClick={handleReturn} />
      </div>
    </div>
  );
}
