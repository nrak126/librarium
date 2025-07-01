"use client";

import { Barcode } from "@/src/components/Barcode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";

export const GetIsbn = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState<string>("");

  useEffect(() => {
    if (isbn) {
      // isbn が設定されたら遷移
      router.push(`/books/rental/${isbn}`);
    }
  }, [isbn, router]);

  return (
    <>
      {isbn ? (
        <Loading />
      ) : (
        <Barcode
          setIsbn={setIsbn}
          text={
            <>
              借りたい本の裏表紙のバーコードを
              カメラにかざしてください
            </>
          }
        />
      )}
    </>
  );
};
