import React from "react";
import { Btns } from "@/src/app/books/rental/components/Btns";
import { FetchBook } from "@/src/app/books/rental/components/fetchBook";

export default async function Page() {
  const isbn = "9784815618599";

  return (
    <div>
      <FetchBook isbn={isbn} />
      <Btns />
    </div>
  );
}
