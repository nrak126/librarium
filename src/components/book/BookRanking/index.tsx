"use client";

import { booksAtom } from "@/src/atoms/atoms";
import { HomeBook } from "../HomeBook";
import { useAtom } from "jotai";

export const BookRanking = () => {
  const [books] = useAtom(booksAtom);
  return <HomeBook showNumber={true} books={books ?? []} />;
};
