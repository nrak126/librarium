"use client";

import React, { useState, useEffect } from "react";
import userIcon from "@/public/next.svg";
import Image from "next/image";
import style from "./index.module.scss";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { User } from "@/src/types";

type Props = {
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavUser: React.FC<Props> = ({ setNavOpen }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        //もしユーザーがすでに存在（登録済み）していたら、ホームにリダイレクト
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${data.user.id}`);

        const fetchedUser: User = await response.json();
        setUser(fetchedUser);
      }
    };
    fetchUser();
  }, [router]);

  const onLink = () => {
    router.push(`/users/${user?.id}`);
    setNavOpen(false);
  };

  return (
    <div className={style.circle}>
      <div className={style.circle1}>
        <div className={style.circle2}>
          <div className={style.user} onClick={onLink}>
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
