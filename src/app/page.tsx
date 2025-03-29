import { PageClient } from "./components/pageClient";
import { SearchBar } from "../components/SearchBar";
import { NavSlide } from "../components/nav/NavSlide";

export default async function Home() {
  return (
    <>
      <SearchBar />
      <NavSlide />
      <PageClient />
    </>
  );
}
