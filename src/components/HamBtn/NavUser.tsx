"use client";

import React from "react";
import userIcon from "@/public/next.svg";
import Image from "next/image";
import style from "./index.module.scss";
import { useRouter } from "next/navigation";

import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";

type Props = {
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavUser: React.FC<Props> = ({ setNavOpen }) => {
  const router = useRouter();

  const [user] = useAtom(logedInUserAtom);

  const onLink = () => {
    router.push(`/users/${user?.id}`);
    setNavOpen(false);
  };

  return (
    <div className={style.circle} onClick={onLink}>
      <div className={style.circle1}>
        <div className={style.circle2}>
          <div className={style.user}>
            <Image
              className={style.userIcon}
              alt={"userIcon"}
              src={user?.icon || userIcon}
              width={70}
              height={70}
            />
            <p
              className={style.userName}
            >{`${user?.studentId}${user?.name}`}</p>
            {/* あとでプロップス */}
          </div>
        </div>
      </div>
    </div>
  );
};
