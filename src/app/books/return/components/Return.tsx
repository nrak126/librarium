import { SearchBar } from "@/src/components/SearchBar";
import style from "../style/return.module.scss";
import { MyData } from "./MyData";

export const Return: React.FC = () => {
  return (
    <>
      <div className={style.all}>
        <h2 className={style.title}>返却</h2>
        <SearchBar func={"検索"} />
      </div>
      <div className={style.under}>
        <p className={style.myProfile}>MY RENTAL BOOK</p>
        <MyData />
        <p className={style.allProfile}>ALL RENTAL BOOK</p>
      </div>
    </>
  );
};
{
}
