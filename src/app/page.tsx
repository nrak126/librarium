import { PageClient } from "./components/pageClient";
import { Book } from "../types";

export default async function Home() {
  const resBook = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
  const books: Book[] = await resBook.json();

  return (
    <>
      <PageClient books={books} />
    </>
  );
}
