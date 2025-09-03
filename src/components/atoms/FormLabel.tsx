import React from "react";
import styles from "../styles/contactForm.module.css";
interface Props {
  htmlFor: string;
  label: string;
}

const FormLabel: React.FC<Props> = ({ htmlFor, label }) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {label}
  </label>
);

export default FormLabel;