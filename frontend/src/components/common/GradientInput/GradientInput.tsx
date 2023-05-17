import React from "react";
import styles from "./GradientInput.module.scss";

interface Props {
  title?: string;
  placeholder?: string;
}

const GradientInput = ({ title, placeholder }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <h2>{title}</h2>
      <input
        type="text"
        className={styles.gradientInput}
        placeholder={placeholder}
      />
    </div>
  );
};

export default GradientInput;
