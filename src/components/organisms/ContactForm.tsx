import React from "react";
import FormGroup from "../molecules/FormGroup";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import { ContactFormData } from "../../types";
import styles from "../styles/contactForm.module.css";

interface Props {
  formData: ContactFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ContactForm: React.FC<Props> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
}) => (
  <form onSubmit={onSubmit} className={styles.form}>
    <FormGroup
      type="input"
      name="name"
      label="Name"
      value={formData.name}
      onChange={onChange}
      required
    />
    <FormGroup
      type="textarea"
      name="address"
      label="Address"
      value={formData.address}
      onChange={onChange}
      required
    />
    <FormGroup
      type="input"
      name="phone"
      label="Phone Number"
      value={formData.phone}
      onChange={onChange}
      required
    />
    <FormGroup
      type="input"
      name="relationship"
      label="Relationship"
      value={formData.relationship}
      onChange={onChange}
      required
    />

    <div className={styles.buttonGroup}>
      <Button
        label="Cancel"
        onClick={onCancel}
        classname="cancelForm-button"
        disabled={false}
      />
      <Button
        label="Submit"
        onClick={() => {}}
        classname="submitForm-button"
        disabled={isLoading}
      />
    </div>

    {isLoading && <Loader overlay color="#10b981" size={48} />}
  </form>
);

export default ContactForm;
