import React from "react";
import styles from "../styles/contactForm.module.css";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<Props> = ({ name, value, onChange, required }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className={styles.input}
  />
);

export default InputField;