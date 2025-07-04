"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "../styles/TabBar.module.scss";
import { RentalTime } from "../../components/book/RentalTime";
import { BookRec } from "../../components/book/BookRec";
import { BookRanking } from "../../components/book/BookRanking";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { useEffect } from "react";
import { NavSlide } from "@/src/components/nav/NavSlide";
import SearchBar from "@/src/components/SearchBar";
import { useAtom } from "jotai";
import { booksAtom, rentalAtom } from "@/src/atoms/atoms";
import type { Book, RentalList } from "@/src/types";
import { logedInUserAtom } from "@/src/atoms/atoms";
import { User } from "@/src/types/user";

export const PageClient: React.FC = () => {
  const [books, setBooks] = useAtom(booksAtom);
  const [rental, setRental] = useAtom(rentalAtom);
  const router = useRouter();
  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);

  // 認証チェック
  useEffect(() => {
    if (!logedInUser) {
      (async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          await router.push("/auth");
          return;
        }

        const user = await fetch(`/api/users/${data.user.id}`);

        const appUser: User = await user.json();
        if (appUser.studentId === null || appUser.studentId === undefined) {
          // 新規ユーザーの場合は登録画面へ
          await router.push("/auth/register");
          return;
        }

        setLogedInUser(appUser);
      })();
    }
  }, [router, logedInUser, setLogedInUser]);

  // 本のデータフェッチ（初回のみ）
  useEffect(() => {
    if (books === null) {
      (async () => {
        try {
          const resBook = await fetch(`/api/books`);
          const data: Book[] = await resBook.json();
          setBooks(data);
        } catch (error) {
          console.error("本のデータ取得エラー:", error);
        }
      })();
    }
  }, [books, setBooks]);

  // レンタルデータのフェッチ（初回のみ）
  useEffect(() => {
    if (rental === null) {
      (async () => {
        try {
          const renBooks = await fetch(`/api/loans/rentalList`);
          const data: RentalList[] = await renBooks.json();
          setRental(data);
        } catch (error) {
          console.error("レンタルデータの取得エラー:", error);
        }
      })();
    }
  }, [rental, setRental]);

  return (
    <>
      <SearchBar searchPageName="books" />
      <NavSlide />
      <Tabs className={styles.tabs}>
        <TabList className={styles.tabList}>
          <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
            ランキング
          </Tab>
          <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
            貸出中
          </Tab>
          <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
            おすすめ
          </Tab>
        </TabList>

        <TabPanel>
          <BookRanking />
        </TabPanel>
        <TabPanel>
          <RentalTime />
        </TabPanel>
        <TabPanel>
          <BookRec />
        </TabPanel>
      </Tabs>
    </>
  );
};
