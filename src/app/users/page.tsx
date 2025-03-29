import { User } from "@/src/types";
import { PageClient } from "./compornent/PageClient";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  const users: User[] = await res.json();

  return (
    <>
      <PageClient users={users} />
    </>
  );
}
