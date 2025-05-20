"use client";

import { useState } from "react";
import style from "./index.module.scss";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBar({
  placeholder = "書籍検索",
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const [searchName, setSearchName] = useState<string>("");
  const pathName = usePathname();

  const handleSearch = async () => {
    if (searchName) {
      await router.push(`${pathName}?search=${searchName}`);
    } else {
      await router.push(`${pathName}`);
    }
  };

  return (
    <div className={style.contents}>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchName}
          className={style.searchBar}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Icon
          icon="bi:search"
          className={style.searchIcon}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
