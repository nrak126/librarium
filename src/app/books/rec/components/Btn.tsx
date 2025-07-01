"use client";
import { useRouter } from "next/navigation";
import style from "../style/index.module.scss";
import { Btn } from "@/src/components/book/Btn";

type RecBtnProps = {
  handleSearch?: () => void; // Optional prop for search handling
};

export const RecBtn: React.FC<RecBtnProps> = (props) => {
  const router = useRouter();

  const handleClick = () => {
    // Handle the button click to show results
    console.log("診断結果を見るボタンがクリックされました");
    router.push("/books/rec/check");
  };
  return (
    <div className={style.btnContainer}>
      <Btn
        text="診断結果を見る"
        bgColor="#E2999B"
        onClick={props.handleSearch}
      />
      <Btn text="戻る" bgColor="#99C6E2" onClick={handleClick} />
    </div>
  );
};
