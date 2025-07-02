import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import type { Book, RentalList, User } from "@/src/types";

// 1時間のミリ秒
const ONE_HOUR = 60 * 60 * 1000;

// タイムスタンプ付きのデータ型
interface TimestampedData<T> {
  data: T;
  timestamp: number;
}

// 基本的なストレージアトム
const booksRankingStorageAtom = atomWithStorage<TimestampedData<Book[]> | null>(
  "booksRanking",
  null
);

// 自動更新機能付きのランキングアトム
export const booksRankingAtom = atom(
  // getter: データを取得する際に時間をチェック
  (get) => {
    const stored = get(booksRankingStorageAtom);
    if (!stored) return null;

    const now = Date.now();
    const isExpired = now - stored.timestamp > ONE_HOUR;

    if (isExpired) {
      // 期限切れの場合はnullを返す（再取得が必要）
      return null;
    }

    return stored.data;
  },
  // setter: データを保存する際にタイムスタンプを付与
  (get, set, newData: Book[] | null) => {
    if (newData === null) {
      set(booksRankingStorageAtom, null);
    } else {
      set(booksRankingStorageAtom, {
        data: newData,
        timestamp: Date.now(),
      });
    }
  }
);

export const booksAtom = atomWithStorage<Book[] | null>("books", null);
export const rentalAtom = atomWithStorage<RentalList[] | null>(
  "rentalBooks",
  null
);
export const usersAtom = atomWithStorage<User[]>("users", []);
export const logedInUserAtom = atomWithStorage<User | null>("userAuth", null);
export const loginRecBookAtom = atomWithStorage<Book[] | null>("recBook", null);
