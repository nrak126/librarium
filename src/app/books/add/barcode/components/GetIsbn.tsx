"use client";

import { Barcode } from "@/src/components/Barcode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const GetIsbn = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState<string>("");

  useEffect(() => {
    if (isbn) {
      // isbn が設定されたら遷移
      router.push(`/books/add/${isbn}`);
    }
  }, [isbn, router]);

  return <>{isbn ? <p>{isbn}</p> : <Barcode setIsbn={setIsbn} />}</>;
};
