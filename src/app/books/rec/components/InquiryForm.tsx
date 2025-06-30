"use client";

import React, { useState } from "react";
import styles from "./InquiryForm.module.scss";

export const InquiryForm = () => {
  const [selectedValue, setSelectedValue] = useState("3");
  const options = ["1", "2", "3", "4", "5"];

  return (
    <div className={styles.container}>
      <p className={styles.question}>
        1. 新しいアイデアや技術に挑戦することにワクワクしますか？
      </p>
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
  );
};

export default InquiryForm;
