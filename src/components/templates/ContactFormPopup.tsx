import React from "react";
import ContactForm from "../organisms/ContactForm";
import styles from "../styles/contactForm.module.css";
import { ContactFormData } from "../../types";

interface Props {
  isOpen: boolean;
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ContactFormPopup: React.FC<Props> = ({ isOpen, formData, onChange, onSubmit, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.heading}>Add Family Members Contact Details</h2>
        <ContactForm
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ContactFormPopup;