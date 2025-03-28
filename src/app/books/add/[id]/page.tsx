
import { BookRegister } from "./components/BookRegister";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <BookRegister isbn={id} />
    </div>
  );
}
