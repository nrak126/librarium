"use client";

import style from "../style/return.module.scss";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { rentalAtom } from "@/src/atoms/atoms";
import { RentalBookItem } from "./RentalBookItem";

export const AllData = () => {
  const [rentalList] = useAtom(rentalAtom);
  // 返却日を「あと〇日」形式に変換する関数
  const getReturnDay = (returnDate: string) => {
    const returnDateObj = dayjs(returnDate);
    return returnDateObj.format("YYYY/MM/DD");
  };

  return (
    <div>
      <div className={style.contents}>
        {rentalList?.length === 0 ? (
          <p className={style.noRental}>貸し出し中の本はありません</p>
        ) : (
          rentalList?.map((rental) => (
            <RentalBookItem
              key={rental.id}
              rental={rental}
              getReturnDay={getReturnDay}
              isAllData={true}
            />
          ))
        )}
      </div>
    </div>
  );
};
