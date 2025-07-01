"use client";

import { logedInUserAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";

`use client`;

export const ShowRec = () => {
  const [loginUser] = useAtom(logedInUserAtom);
  return (
    <>
      <p>あなたの興味のある分野は「{loginUser?.interest_tech}」です。</p>
    </>
  );
};
