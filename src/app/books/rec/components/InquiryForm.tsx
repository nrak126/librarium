"use client";

import React, { useState } from "react";
import styles from "./InquiryForm.module.scss";
import { RecBtn } from "./Btn";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { logedInUserAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";

type Props = {
  questions: string[];
};

export const InquiryForm: React.FC<Props> = ({ questions }) => {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useAtom(logedInUserAtom);
  const options = ["1", "2", "3", "4", "5"];
  const uid = loginUser?.uid;

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSearch = async () => {
    const allAnswered = answers.every((a) => a !== "");
    if (!allAnswered) {
      alert("全ての質問に回答してください");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/books/recs?answer=${answers}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.recommendation) {
          if (uid) {
            await fetch(`/api/users/${uid}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ interest_tech: data.recommendation }),
            });
          }
          setLoginUser((prev) => {
            if (!prev) return prev;
            return { ...prev, interest_tech: data.recommendation };
          });
          setNotFound(false);
          await router.push(
            `/books/rec/check?reason=${encodeURIComponent(data.reason)}`
          );
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("AIのAPIエラー(fetch):", error);
      setNotFound(true);
    }
  };

  if (notFound) {
    return (
      <div className={styles.notFound}>おすすめが見つかりませんでした。</div>
    );
  }

  if (loading) {
    return <LoadingBrown />;
  }

  return (
    <div>
      <h2 className={styles.title}>お勧め診断</h2>
      <div className={styles.bar}></div>
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
            <p className={styles.label2}>そう思わない</p>
          </div>
          <div className={styles.bar}></div>
        </div>
      ))}
      <div className={styles.btn}>
        <RecBtn handleSearch={handleSearch} />
      </div>
    </div>
  );
};
