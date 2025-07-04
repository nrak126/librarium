import styles from "./index.module.scss";
import hrBrown from "./hrBrown.svg";
import Image from "next/image";

export default function LoadingBrown() {
  return (
    <>
      <div className={styles.loading}>
        <Image src={hrBrown} width={300} height={50} alt="line" />
        <p className={styles.p}>now loading</p>
        <Image src={hrBrown} width={300} height={50} alt="line" />
        <div className={styles.ballpulse}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
