import { User } from "@/src/types";
import UserData from "../UserData";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";

function UsersList({ users }: { users: User[] }) {
  const [logedInUser] = useAtom<User | null>(logedInUserAtom);
  console.log(logedInUser);
  return (
    <>
      {users.map((data) => {
        if (logedInUser && data.id === logedInUser.id) {
          return null;
        }
        return <UserData user={data} key={data.id} />;
      })}
    </>
  );
}

export default UsersList;
