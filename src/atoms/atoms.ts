import { atom } from "jotai";
import type { Book, RentalList, User } from "@/src/types";

export const booksAtom = atom<Book[] | null>(null);
export const rentalAtom = atom<RentalList[] | null>(null);
export const usersAtom = atom<User[] | null>(null);
export const logedInUserAtom = atom<User | null>(null);
export const uidAtom = atom<string | null>(null);
