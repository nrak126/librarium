"use client";

import React from "react";
import userIcon from "@/src/components/HamBtn/Img/fu_icon.jpg";
import Image from "next/image";
import style from "./index.module.scss";
import { useRouter } from "next/navigation";

type Props = {
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavUser: React.FC<Props> = ({ setNavOpen }) => {
  const router = useRouter();

  const onLink = () => {
    router.push("/users");
    setNavOpen(false);
  };

  return (
    <div className={style.circle}>
      <div className={style.circle1}>
        <div className={style.circle2}>
          <div className={style.user} onClick={onLink}>
            <Image
              className={style.userIcon}
              alt={"user"}
              src={userIcon}
              width={70}
              height={70}
            />
            <p className={style.userName}>k24142矢部大地</p>
            {/* あとでプロップス */}
          </div>
        </div>
      </div>
    </div>
  );
};
