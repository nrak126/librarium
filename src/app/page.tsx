"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { NavSlide } from "../components/nav/NavSlide";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./styles/TabBar.module.scss";
import { RentalTime } from "../components/book/RentalTime";
import { BookRec } from "../components/book/BookRec";
import { BookRanking } from "../components/book/BookRanking";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";

export default function Home() {
  const [searchClick, setSearchClick] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        await router.push("/auth");
      }
    };
    fetchUser();
  }, [router]);

  return (
    <>
      <SearchBar searchClick={searchClick} setSearchClick={setSearchClick} />
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
}
