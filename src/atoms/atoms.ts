import { atom } from "jotai";
import type { Book, RentalList, User } from "@/src/types";

export const booksAtom = atom<Book[]>([]); // ← 初期値を [] に
export const rentalAtom = atom<RentalList[] | null>(null);
export const usersAtom = atom<User[] | null>(null);
export const logedInUserAtom = atom<User | null>(null);
