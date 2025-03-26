"use client";

import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { NavSlide } from "../components/nav/NavSlide";

export default function Home() {
  const [searchCilck, setSearchCilck] = useState(false);
  const [searchName, setSearchName] = useState("");

  return (
    <>
      <SearchBar
        searchCilck={searchCilck}
        setSearchCilck={setSearchCilck}
        searchName={searchName}
        setSearchName={setSearchName}
      />
      <NavSlide />
    </>
  );
}
