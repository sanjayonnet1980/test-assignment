import React from "react";
import styles from "../styles/contactForm.module.css";
interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextAreaField: React.FC<Props> = ({ name, value, onChange, required }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className={styles.textarea}
  />
);

export default TextAreaField;