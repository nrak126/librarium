"use client";

import { Barcode } from "@/src/components/Barcode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingBrown from "@/src/components/LoadingBrown";

export const GetIsbn = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState<string>("");

  useEffect(() => {
    if (isbn) {
      // isbn が設定されたら遷移
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/books/add/${isbn}`);
    }
  }, [isbn, router]);

  return (
    <>
      {isbn ? (
        <LoadingBrown />
      ) : (
        <Barcode
          setIsbn={setIsbn}
          text={
            <>
              追加したい本のバーコードをカメラにかざしてください
            </>
          }
        />
      )}
    </>
  );
};
