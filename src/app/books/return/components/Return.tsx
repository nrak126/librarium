import { SearchBar } from "@/src/components/SearchBar";
import style from "../style/return.module.scss";
import Image from "next/image";
import Icon from "./fu_icon.jpg";
import BookIcon from "./img.jpg";

export const Return: React.FC = () => {
  return (
    <>
      <div className={style.all}>
        <h2 className={style.title}>返却</h2>
        <SearchBar func={"検索"} />
      </div>
      <p className={style.myProfile}>MY RENTAL BOOK</p>
      <div className={style.contents}>
        <div className={style.content}>
          <Image
            src={Icon}
            alt={"librariumのアイコン"}
            width={57}
            height={57}
            className={style.icon}
          />
          <div className={style.text}>
            <p className={style.bookName}>Iphone開発アプリ</p>
            <p className={style.return}>
              返却期限：<span className={style.returnTime}>2025/99/99</span>
            </p>
            <p className={style.userName}>あと3日</p>
          </div>
          <Image
            src={BookIcon}
            alt={"librariumのアイコン"}
            width={60}
            height={90}
            className={style.BookIcon}
          />
        </div>
      </div>
    </>
  );
};
{
}
