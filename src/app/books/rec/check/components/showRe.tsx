"use client";

import { logedInUserAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

export const ShowRec = () => {
  const [loginUser] = useAtom(logedInUserAtom);
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  return (
    <>
      <p>あなたの興味のある分野は「{loginUser?.interest_tech}」です。</p>
      <p>{reason}</p>
    </>
  );
};
