export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  publisher: string;

  stock: number;
  available: number;
}

export type BookEditorProps = {
  bookInfo: Book;
};

export type IndustryIdentifier = {
  type: string;
  identifier: string;
};