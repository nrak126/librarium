"use client";
import React from "react";
import classes from "./index.module.scss";

interface BtnProps {
    text: string;
    bgColor: string;
    handleClick?: () => void;
}

export const Btn: React.FC<BtnProps> = ({ text, bgColor, handleClick }) => {
    return (
    
        <button
            className={classes.BaseBtn}
            style={{ backgroundColor: bgColor }}
            onClick={handleClick}
            >
            {text}
        </button>
    
    );
};
