import styles from "./index.module.scss";
import { User } from "@/src/types";
import UserData from "../UserData";

function UsersList({ users }: { users: User[] }) {
  return (
    <>
      {users.map((data, index) => {
        return <UserData user={data} key={index} />;
      })}
    </>
  );
}

export default UsersList;
