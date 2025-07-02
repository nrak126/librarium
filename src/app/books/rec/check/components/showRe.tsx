"use client";

import { logedInUserAtom } from "@/src/atoms/atoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import style from "./showRe.module.scss";
import { Btn } from "@/src/components/book/Btn";
import webIcon from "@/public/web.png";
import securityIcon from "@/public/security.png";
import mobileIcon from "@/public/mobile.png";
import electronicIcon from "@/public/electronic.png";
import CG from "@/public/CG.png";
import built from "@/public/built.png";
import infra from "@/public/infra.png";
import design from "@/public/design.png";
import Image from "next/image";
import huki from "@/public/huki.svg";
import { Yaldevi } from "next/font/google";

const font = Yaldevi({
  weight: "400",
  subsets: ["latin"],
});

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
        <h3 className={style.tech}>{loginUser?.interest_tech}</h3>
      </div>

      <div className={style.icon}>
        {(() => {
          switch (loginUser?.interest_tech) {
            case "Web":
              return <Image src={webIcon} alt="Web" width={200} height={200} />;
            case "セキュリティ":
              return (
                <Image
                  src={securityIcon}
                  alt="Security"
                  width={200}
                  height={200}
                />
              );
            case "モバイル":
              return (
                <Image src={mobileIcon} alt="Mobile" width={200} height={200} />
              );
            case "CG | ゲーム":
              return <Image src={CG} alt="CG" width={200} height={200} />;
            case "電子書籍":
              return (
                <Image
                  src={electronicIcon}
                  alt="Electronic"
                  width={200}
                  height={200}
                />
              );
            case "インフラ":
              return <Image src={infra} alt="Infra" width={200} height={200} />;
            case "組み込み":
              return <Image src={built} alt="Built" width={200} height={200} />;
            case "デザイン":
              return (
                <Image src={design} alt="Design" width={200} height={200} />
              );
            default:
              return (
                <Image src={webIcon} alt="Default" width={200} height={200} />
              );
          }
        })()}
        <div className={style.reason}>
          <div className={style.reasonImage}>
            <Image src={huki} alt="Reason" width={300} height={290} />
          </div>
          <div className={`${style.reasonTextContainer} ${font.className}`}>
            <p className={style.reasonTitle}>［診断理由］</p>
            <p className={style.reasonText}>{reason}</p>
          </div>
        </div>
        <div className={style.btnContainer}>
          <Btn text="ホームに戻る" bgColor="#E2999B" onClick={handleBack} />
        </div>
      </div>
    </>
  );
};
