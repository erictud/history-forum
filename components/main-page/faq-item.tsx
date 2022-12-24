"use client";
import { useState } from "react";
import ArrDown from "../../icons/ArrDown";
import ArrTop from "../../icons/ArrTop";
import QuestionMarkIcon from "../../icons/QuestionMarkIcon";
import styles from "./faq-item.module.css";

export default function FaqItem(props: { question: string; answer: string }) {
  const { question, answer } = props;
  const [showContent, setShowContent] = useState(false);
  return (
    <div className={styles["faq-item"]}>
      <div className={styles["faq-header"]} onClick={() => setShowContent((prev) => !prev)}>
        <div className={styles["faq-header__container"]}>
          <QuestionMarkIcon />
          <h5>{question}</h5>
        </div>
        {showContent ? <ArrTop /> : <ArrDown />}
      </div>
      {showContent && (
        <div className={styles["faq-answer"]}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
