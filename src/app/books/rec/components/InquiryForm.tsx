"use client";

import React, { useEffect, useState } from "react";
import styles from "./InquiryForm.module.scss";

type Props = {
  questions: string[];
};

type Rec = {
  recommendation: string;
  reason: string;
};

export const InquiryForm: React.FC<Props> = ({ questions }) => {
  // 10個の回答を配列で管理（初期値は空文字列）
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [rec, setRec] = useState<Rec>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = ["1", "2", "3", "4", "5"];

  // ラジオボタンの選択時に該当indexの値を更新
  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // 回答が全て埋まったらAPIリクエスト
  useEffect(() => {
    const allAnswered = answers.every((a) => a !== "");
    if (allAnswered) {
      setLoading(true);
      (async () => {
        try {
          console.log("Get1 ", answers);
          const res = await fetch(`/api/books/recs?answer=${answers}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.recommendation) {
              setRec(data);
              setNotFound(false);
            } else {
              setNotFound(true);
            }
          } else {
            setNotFound(true);
          }
        } catch (error) {
          console.error("AIのAPIエラー(fetch):", error);
          setNotFound(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [answers]);

  return (
    <div>
      {questions.map((question, idx) => (
        <div className={styles.container} key={question}>
          <p className={styles.question}>{question}</p>
          <div className={styles.radioGroup}>
            <p className={styles.label}>そう思う</p>
            <div className={styles.radioOptions}>
              {options.map((value, index) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name={`inquiry-${idx}`}
                    value={value}
                    checked={answers[idx] === value}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className={styles.radioInput}
                  />
                  <span
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
      ))}
      {loading && <div>診断中...</div>}
      {notFound && <div>おすすめが見つかりませんでした</div>}
      {rec && (
        <div className={styles.recommendation}>
          {rec.recommendation}
          {rec.reason}
        </div>
      )}
    </div>
  );
};

export default InquiryForm;
