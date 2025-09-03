"use client";

import { useState } from "react";
import styles from "./ContentCreator.module.scss";

const plusIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14" />
  </svg>
);

export default function ContentCreator({
  placeholder,
  buttonText,
  handleSubmit,
}: {
  placeholder: string;
  buttonText: string;
  handleSubmit?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleSubmit?.(inputValue.trim());
    setInputValue("");
  };

  const canGenerate = inputValue.trim().length > 0 && inputValue.trim().length <= 32;

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input type="text" placeholder={placeholder} value={inputValue} onChange={onChange} maxLength={32} />
      <button type="submit" disabled={!canGenerate}>
        {plusIcon} {buttonText}
      </button>
    </form>
  );
}
