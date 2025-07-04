import { BookEdit } from "./components/BookEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <BookEdit isbn={id} />
    </div>
  );
}
