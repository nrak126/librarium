import Image from "next/image";
import icon from "@/public/rei.svg";
import style from "./diagnosis.module.scss";
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
        <h3 className={style.title}>リベアーの本診断</h3>
        <p className={style.diagText}>
          あなたにぴったりの技術書を診断してみよう！
        </p>
        <Image
          src={icon}
          alt="診断イメージ"
          width={350}
          height={100}
          className={style.diagImage}
        />
        <Btn text="診断する" bgColor="#E2999B" onClick={handleBack} />
        <p className={style.diagText}>既に興味のある分野がありますか？</p>
        <p className={style.diagDesc}>
          興味のある分野の選択すると、その分野に関連するおすすめの本が表示されます
        </p>
      </div>
      <div className={style.btnContainer}>
        <Btn text="選択" bgColor="#99C6E2" onClick={props.handleClick} />
      </div>
    </>
  );
};
