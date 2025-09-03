import React, { useState } from "react";
import CreditFormField from "./CreditFormField";
import { validateCreditForm } from "./creditFormValidation";
import styles from "./salaryCreditPopupCard.module.css";
import { toast } from "react-toastify";
import Loader from "../../atoms/Loader";
import Button from "../../atoms/Button";

interface CreditPopupCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreditFormData {
  month: string;
  creditAmount: number;
  date: string;
  bankName: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SalaryCreditPopupCard: React.FC<CreditPopupCardProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<CreditFormData>({
    month: "",
    creditAmount: 0,
    date: "",
    bankName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    field: keyof CreditFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const cancelButton = () => {
    setErrors({});
    setFormData({ month: "", creditAmount: 0, date: "", bankName: "" });
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const newErrors = validateCreditForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const url =
      "https://script.google.com/macros/s/AKfycbycKnw_t_wCDftLpdUElrX3y623zfONgiPN8qpZI7kXUbKJ-ze-wxFLkpdRhWwQ4E6h/exec";
    const formattedData = new URLSearchParams({
      month: formData.month,
      creditamount: formData.creditAmount.toString(),
      date: formData.date,
      bankname: formData.bankName,
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formattedData.toString(),
      });
      const result = await res.text();
      const parsed = JSON.parse(result);
      toast.success(parsed.message);
      cancelButton();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Salary Credit Entry</h2>
          <button onClick={cancelButton} className={styles.closeButton}>
            ✕
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.fieldWrapper}>
            <CreditFormField label="Month:" error={errors.month}>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={(e) => handleChange("month", e.target.value)}
                className={styles.input}
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </CreditFormField>
          </div>
          <CreditFormField label="Credit Amount:" error={errors.creditAmount}>
            <input
              type="number"
              value={formData.creditAmount}
              onChange={(e) =>
                handleChange(
                  "creditAmount",
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
              className={styles.input}
            />
          </CreditFormField>

          <CreditFormField label="Bank Name:" error={errors.bankName}>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              className={styles.input}
              placeholder="Enter Bank Name.."
            />
          </CreditFormField>

          <CreditFormField label="Date:" error={errors.date}>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className={styles.input}
            />
          </CreditFormField>

          <div className={styles.footer}>
            <Button
              label="Submit"
              onClick={handleSubmit}
              classname="submitForm-button"
              disabled={isLoading}
            />
          </div>

          {isLoading && <Loader overlay color="#10b981" size={48} />}
        </div>
      </div>
    </div>
  );
};

export default SalaryCreditPopupCard;
