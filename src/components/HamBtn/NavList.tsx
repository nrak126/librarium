import Icon1 from "@/src/components/HamBtn/Img/rental_side.svg";
import Icon2 from "@/src/components/HamBtn/Img/return_side.svg";
import Icon3 from "@/src/components/HamBtn/Img/user_side.svg";
import Icon4 from "@/src/components/HamBtn/Img/books_side.svg";
import Icon5 from "@/src/components/HamBtn/Img/add_side.svg";

export const navItems = [
  { id: 1, link: "/books/rental/barcode", label: "貸出", iconUrl: Icon1 },
  { id: 2, link: "/books/return", label: "返却", iconUrl: Icon2 },
  { id: 3, link: "/users", label: "利用者一覧", iconUrl: Icon3 },
  { id: 4, link: "/books", label: "書籍一覧", iconUrl: Icon4 },
  {
    id: 5,
    link: "/books/add/barcode",
    label: "新しい本の登録",
    iconUrl: Icon5,
  },
];
