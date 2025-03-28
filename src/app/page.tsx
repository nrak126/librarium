"use client";

import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { NavSlide } from "../components/nav/NavSlide";

export default function Home() {
  const [searchClick, setSearchClick] = useState(false);

  return (
    <>
      <SearchBar searchClick={searchClick} setSearchClick={setSearchClick} />
      <NavSlide />
    </>
  );
}
