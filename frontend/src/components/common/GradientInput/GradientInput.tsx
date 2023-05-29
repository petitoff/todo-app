import React from "react";
import styles from "./GradientInput.module.scss";

interface Props {
  title?: string;
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
}

const GradientInput = ({ title, placeholder, value, setValue }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <h2>{title}</h2>
      <input
        type="text"
        className={styles.gradientInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
};

export default GradientInput;
