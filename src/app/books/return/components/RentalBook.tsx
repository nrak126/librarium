import Image from "next/image";
import style from "../style/return.module.scss";
export type Rental = {
  id: string;
  users: {
    id: string;
    icon: string;
    studentId: string;
    name: string;
  };
  books: {
    isbn: string;
    title: string;
    thumbnail: string;
  };
  return_date: string;
  isReturned: boolean;
};

export const RentalBookItem = ({
  book,
  isAllData,
  onLink,
  getReturnDay,
}: {
  book: Rental;
  isAllData?: boolean;
  onLink?: (isbn: string, returnDate: string) => void;
  getReturnDay: (returnDate: string) => string;
}) => (
  <div
    key={book.id}
    className={`${style.content} ${!isAllData ? style.allData : ""}`}
    onClick={
      onLink ? () => onLink(book.books.isbn, book.return_date) : undefined
    }
  >
    <Image
      src={book.users.icon}
      alt="librariumのアイコン"
      width={57}
      height={57}
      className={style.icon}
    />
    <div className={style.text}>
      <p className={style.bookName}>{book.books.title}</p>
      <p className={style.return}>
        返却期限：
        <span className={style.returnTime}>
          {getReturnDay(book.return_date)}
        </span>
      </p>
      <p className={style.userName}>
        {`${book.users.studentId}　${book.users.name}`}
      </p>
    </div>
    <Image
      src={book.books.thumbnail}
      alt="librariumの本のアイコン"
      width={60}
      height={90}
      className={style.BookIcon}
    />
  </div>
);
