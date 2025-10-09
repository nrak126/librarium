"use client";

import { Barcode } from "@/src/components/Barcode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading";

export const GetIsbn = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isbn) {
      // isbn が設定されたら遷移
      router.push(`/books/rental/${isbn}`);
    }
  }, [isbn, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const displayText = isMobile
    ? "借りたい本の裏表紙のバーコードをカメラにかざしてください"
    : "借りたい本の裏表紙のバーコードをスキャンしてください";

  return (
    <>{isbn ? <Loading /> : <Barcode setIsbn={setIsbn} text={displayText} />}</>
  );
};
