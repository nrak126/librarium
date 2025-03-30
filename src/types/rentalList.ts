import { type Book } from "./book";
import { type Loan } from "./loan";
import { type User } from "./user";

export interface RentalList extends Loan {
  books: Book;
  users: User;
}
