"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "../styles/TabBar.module.scss";
import { RentalTime } from "../../components/book/RentalTime";
import { BookRec } from "../../components/book/BookRec";
import { BookRanking } from "../../components/book/BookRanking";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { NavSlide } from "@/src/components/nav/NavSlide";
import { SearchBar } from "@/src/components/SearchBar";
import { useAtom } from "jotai";
import { booksAtom, rentalAtom } from "@/src/atoms/atoms";
import type { Book, RentalList } from "@/src/types";

export const PageClient: React.FC = () => {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [books, setBooks] = useAtom(booksAtom);
  const [rental, setRental] = useAtom(rentalAtom);
  const router = useRouter();

  // 認証チェック
  useEffect(() => {
    (async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        await router.push("/auth");
      }
    })();
  }, [router]);

  // 検索処理
  useEffect(() => {
    if (searchClick) {
      router.push(`/books?searchName=${searchName}`);
    }
  }, [searchClick, searchName, router]);

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
      <SearchBar
        searchClick={searchClick}
        setSearchClick={setSearchClick}
        searchName={searchName}
        setSearchName={setSearchName}
      />
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
          <BookRanking books={books ?? []} />
        </TabPanel>
        <TabPanel>
          <RentalTime rental={rental ?? []} />
        </TabPanel>
        <TabPanel>
          <BookRec books={books ?? []} />
        </TabPanel>
      </Tabs>
    </>
  );
};
