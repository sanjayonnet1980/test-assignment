import React from "react";
import FormLabel from "../atoms/FormLabel";
import InputField from "../atoms/InputField";
import TextAreaField from "../atoms/TextAreaField";
import styles from "../styles/contactForm.module.css";
interface Props {
  type: "input" | "textarea";
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const FormGroup: React.FC<Props> = ({
  type,
  name,
  label,
  value,
  onChange,
  required,
}) => (
  <div className={styles.formGroup}>
    <FormLabel htmlFor={name} label={label} />
    {type === "input" ? (
      <InputField
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    ) : (
      <TextAreaField
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

export default FormGroup;
