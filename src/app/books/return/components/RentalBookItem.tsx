import Image from "next/image";
import style from "../style/return.module.scss";
import { RentalList } from "@/src/types";

type Props = {
  rental: RentalList;
  isAllData?: boolean;
  onLink?: (isbn: string, returnDate: string, loanId: string) => void;
  getReturnDay: (returnDate: string) => string;
};

export const RentalBookItem: React.FC<Props> = (props) => {
  const { rental, isAllData, onLink, getReturnDay } = props;

  const isOver = (() => {
    const returnDate = new Date(rental.return_date);
    const today = new Date();

    // 時刻部分をリセット（00:00:00に設定）
    returnDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return returnDate < today; // 返却日が今日より前の場合のみtrue
  })();

  return (
    <div
      key={rental.id}
      className={`${style.content} ${!isAllData ? style.allData : ""}`}
      onClick={
        onLink
          ? () => onLink(rental.books.isbn, rental.return_date, rental.id)
          : undefined
      }
    >
      <Image
        src={rental.users.icon}
        alt="librariumのアイコン"
        width={57}
        height={57}
        className={style.icon}
      />
      <div className={style.text}>
        <p className={style.bookName}>{rental.books.title}</p>
        <p className={`${style.return} ${isOver ? style.over : ""}`}>
          返却期限：
          <span className={style.returnTime}>
            {getReturnDay(rental.return_date)}
          </span>
        </p>
        <p className={`${style.userName} ${isAllData ? style.allUser : ""}`}>
          {`${rental.users.studentId}　${rental.users.name}`}
        </p>
      </div>
      <Image
        src={rental.books.thumbnail}
        alt="librariumの本のアイコン"
        width={60}
        height={90}
        className={style.BookIcon}
      />
    </div>
  );
};
