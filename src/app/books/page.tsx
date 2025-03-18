import BooksList from "./components/BooksList";

export default async function Page() {
  // ここでサーバーから初期データ取得してもいい（任意）
  // const books = await fetchBooks();

  return (
    <div>
      <BooksList />
    </div>
  );
}
