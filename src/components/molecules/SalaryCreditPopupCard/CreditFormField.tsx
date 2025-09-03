import React from "react";
import styles from "./salaryCreditPopupCard.module.css";

interface Props {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const CreditFormField: React.FC<Props> = ({ label, children, error }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>
      {label}
      {children}
    </label>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default CreditFormField;