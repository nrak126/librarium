import styles from "./index.module.scss";
import hr from "./hr.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className={styles.loading}>
        <Image src={hr} width={300} height={50} alt="line" />
        <p className={styles.p}>now loading</p>
        <Image src={hr} width={300} height={50} alt="line" />
        <p className={styles.ballpulse}></p>
      </div>
    </>
  );
}
