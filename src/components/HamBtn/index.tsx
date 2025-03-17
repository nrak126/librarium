import React, { useState } from "react";
import style from "./index.module.scss";

export const HamBtn: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav>
      <div
        className={`${style.menuToggle} ${menuOpen ? style.active : ""}`}
        onClick={toggleMenu}
      >
        <div className={style.bar}></div>
        <div className={style.bar}></div>
        <div className={style.bar}></div>
      </div>
    </nav>
  );
};
