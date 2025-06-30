export type Book = {
  isbn: string; // 書籍のISBN
  createdAt: string; // 作成日時 (ISO 8601形式)
  title: string; // 書籍タイトル
  thumbnail: string; // サムネイル画像URL
  description: string; // 説明文
  author: string; // 著者名
  stock: number; // 在庫数
  available: number; // 貸出可能数
  tags: string[]; // タグ（配列形式、nullの場合もあり）
  publisher: string; // 出版社
  loan_count: number; // 貸出回数
};

export type BookEditorProps = {
  bookInfo: Book;
};

export type IndustryIdentifier = {
  type: string;
  identifier: string;
};
