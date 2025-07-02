import Image from "next/image";
import icon from "@/public/rei.svg";
import style from "../index.module.scss";
import { Btn } from "../../Btn";
import { useRouter } from "next/navigation";

interface DiagnosisProps {
  handleClick: () => void;
}

export const Diagnosis: React.FC<DiagnosisProps> = (props) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/books/rec");
  };
  return (
    <>
      <div className={style.noRec}>
        <h3 className={style.title}>おすすめ診断</h3>
        <p className={style.diagText}>
          あなたにおすすめの技術書を診断してみませんか？
        </p>
        <Image
          src={icon}
          alt="診断イメージ"
          width={200}
          height={100}
          className={style.diagImage}
        />
        <p className={style.diagText}>既に興味のある分野がありますか？</p>
      </div>
      <div className={style.btnContainer}>
        <Btn text="はい" bgColor="E2999B" onClick={props.handleClick} />
        <Btn text="いいえ" bgColor="#99C6E2" onClick={handleBack} />
      </div>
    </>
  );
};
