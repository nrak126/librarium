import { atom } from "jotai";
import type { Book, RentalList } from "@/src/types";

export const booksAtom = atom<Book[] | null>(null);
export const rentalAtom = atom<RentalList[] | null>(null);
