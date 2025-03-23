"use client";

import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { NavSlide } from "../components/nav/NavSlide";

export default function Home() {
  const [searchCilck, setSearchCilck] = useState(false);

  return (
    <>
      <SearchBar searchCilck={searchCilck} setSearchCilck={setSearchCilck} />
      <NavSlide />
    </>
  );
}
