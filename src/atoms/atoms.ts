import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Book, RentalList, User } from "@/src/types";

export const booksAtom = atom<Book[] | null>(null);
export const rentalAtom = atom<RentalList[] | null>(null);
export const usersAtom = atomWithStorage<User[]>("users", []);
export const logedInUserAtom = atomWithStorage<User | null>("userAuth", null);
export const uidAtom = atom<string | null>(null);
