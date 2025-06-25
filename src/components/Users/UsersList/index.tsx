import { User } from "@/src/types";
import UserData from "../UserData";

function UsersList({ users }: { users: User[] }) {
  return (
    <>
      {users.map((data) => {
        return <UserData user={data} key={data.id} />;
      })}
    </>
  );
}

export default UsersList;
