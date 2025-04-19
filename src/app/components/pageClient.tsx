"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "../styles/TabBar.module.scss";
import { RentalTime } from "../../components/book/RentalTime";
import { BookRec } from "../../components/book/BookRec";
import { BookRanking } from "../../components/book/BookRanking";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { Book, RentalList } from "../../types";
import { useEffect, useState } from "react";
import { NavSlide } from "@/src/components/nav/NavSlide";
import { SearchBar } from "@/src/components/SearchBar";

export const PageClient: React.FC = () => {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [rental, setRental] = useState<RentalList[]>([]);
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // レンタルデータの取得
    (async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        await router.push("/auth");
      }
    })();
  }, [router]);

  useEffect(() => {
    if (searchClick === true) {
      router.push(`/books?searchName=${searchName}`);
    }
  }, [searchClick, searchName, router]);

  useEffect(() => {
    (async () => {
      const resBook = await fetch(`/api/books`);
      const data: Book[] = await resBook.json();
      setBooks(data);
    })();
  }, [router]);

  useEffect(() => {
    // レンタルデータの取得
    (async () => {
      try {
        const renBooks = await fetch(`/api/loans/rentalList`);
        const data: RentalList[] = await renBooks.json();
        setRental(data);
      } catch (error) {
        console.error("レンタルデータの取得エラー:", error);
      }
    })();
  }, []);

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
          <BookRanking books={books} />
        </TabPanel>
        <TabPanel>
          <RentalTime rental={rental} />
        </TabPanel>
        <TabPanel>
          <BookRec books={books} />
        </TabPanel>
      </Tabs>
    </>
  );
};
