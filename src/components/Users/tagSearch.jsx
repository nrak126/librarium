import { usersData } from "./userId";
import styles from "./userData.module.scss";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import sampleData from "./sampleData";
import tagGroup from "./tagGroup";

function searchTag() {
  const result = sampleData.filter((data) => tagGroup.includes(data));

  console.log(result);

  return (
    <>
    </>
  );
}
