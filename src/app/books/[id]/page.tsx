// app/book/[id]/page.tsx

import { PageClient } from "./components/PageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;

  return <PageClient />;
}
