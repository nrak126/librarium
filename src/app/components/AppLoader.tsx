"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/public/icon.svg";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // アプリの初期化処理（例：最低限のローディング時間を設ける）
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5秒間ローディング表示

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90svh",
          width: "100svw",
          position: "relative",
          backgroundColor: "#FFFBF5",
        }}
      >
        <Image src={icon} alt="Loading..." width={130} height={130} />
      </div>
    );
  }

  return <>{children}</>;
}
