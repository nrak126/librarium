"use client";

import { logedInUserAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import style from "./showRe.module.scss";
import { Btn } from "@/src/components/book/Btn";
import icon from "@/public/libea.svg";
import Image from "next/image";

export const ShowRec = () => {
  const [loginUser] = useAtom(logedInUserAtom);
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className={style.contents}>
        <h2 className={style.title}>診断結果</h2>
        <h3>{loginUser?.interest_tech}</h3>
        <div className={style.reason}>
          <p>{reason}</p>
        </div>
      </div>

      <div className={style.icon}>
        <Image src={icon} alt="logo" width={200} height={200} />

        <div className={style.btnContainer}>
          <Btn text="ホームに戻る" bgColor="#E2999B" onClick={handleBack} />
        </div>
      </div>
    </>
  );
};
