"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "../styles/TabBar.module.scss";
import { RentalTime } from "../../components/book/RentalTime";
import { BookRec } from "../../components/book/BookRec";
import { BookRanking } from "../../components/book/BookRanking";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { Book } from "../../types";
import { useEffect, useState } from "react";
import { NavSlide } from "@/src/components/nav/NavSlide";
import { SearchBar } from "@/src/components/SearchBar";

export const PageClient: React.FC = () => {
  const [searchClick, setSearchClick] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        await router.push("/auth");
      }
    };
  }, []);

  useEffect(() => {
    if (searchClick === true) {
      router.push(`/books?searchName=${searchName}`);
    }
  }, [searchClick]);

  useEffect(() => {
    (async () => {
      const resBook = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`
      );
      const data: Book[] = await resBook.json();
      setBooks(data);
    })();
  }, [router]);

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
          <RentalTime />
        </TabPanel>
        <TabPanel>
          <BookRec books={books} />
        </TabPanel>
      </Tabs>
    </>
  );
};
