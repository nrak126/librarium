"use client";

import React, { useState } from "react";
import styles from "./InquiryForm.module.scss";
import { Btn } from "@/src/components/book/Btn";

type props = {
  question: string;
};

export const InquiryForm: React.FC<props> = (props) => {
  const { question } = props;
  const [selectedValue, setSelectedValue] = useState("");
  const options = ["1", "2", "3", "4", "5"];

  const handleClick = () => {
    // Handle the button click to show results
    console.log("診断結果を見るボタンがクリックされました");
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.question}>{question}</p>
        <div className={styles.radioGroup}>
          <p className={styles.label}>そう思う</p>
          <div className={styles.radioOptions}>
            {options.map((value, index) => (
              <label key={value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="inquiry"
                  value={value}
                  checked={selectedValue === value}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className={styles.radioInput}
                />
                <p
                  className={`${styles.customRadio} ${
                    styles[`customRadio${index + 1}`]
                  }`}
                />
              </label>
            ))}
          </div>
          <p className={styles.label}>そう思わない</p>
        </div>
        <div className={styles.bar}></div>
      </div>
    </>
  );
};

export default InquiryForm;
