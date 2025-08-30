import React, { useState } from "react";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import { toast } from "react-toastify";

interface CreditPopupCardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreditFormData {
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cancelButton = () => {
    setErrors({});

    setFormData({
      month: "",
      creditAmount: 0,
      date: "",
      bankName: "",
    });
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { month, creditAmount, date, bankName } = formData;
    const newErrors: { [key: string]: string } = {};

    if (!month) newErrors.month = "Month is required.";
    if (creditAmount <= 0)
      newErrors.creditAmount = "Amount must be greater than 0.";
    if (!date) newErrors.date = "Date is required.";
    if (!bankName.trim()) newErrors.bankName = "Bank name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    const url =
      "https://script.google.com/macros/s/AKfycbycKnw_t_wCDftLpdUElrX3y623zfONgiPN8qpZI7kXUbKJ-ze-wxFLkpdRhWwQ4E6h/exec";
    const formattedData = new URLSearchParams({
      month: formData.month.toString(),
      creditamount: formData.creditAmount.toString(),
      date: formData.date.toString(),
      bankname: formData.bankName.toString(),
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formattedData.toString(),
      });
      const result = await res.text();
      const parsed = JSON.parse(result);
      toast.success(parsed.message, {
        position: "top-right",
        autoClose: 5000,
      });

      setFormData({
        month: "",
        creditAmount: 0,
        date: "",
        bankName: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "green" }}>Salary Credit Entry</h2>
          <button onClick={cancelButton} style={styles.closeButton}>
            ✕
          </button>
        </div>
        <div style={styles.container}>
          <label style={styles.label}>
            Month:
            <select
              value={formData.month}
              onChange={(e) => handleChange("month", e.target.value)}
              style={styles.input}
            >
              <option value="">Select Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {errors.month && <span style={styles.error}>{errors.month}</span>}
          </label>

          <label style={styles.label}>
            Credit Amount:
            <input
              type="number"
              value={formData.creditAmount}
              onChange={(e) =>
                handleChange(
                  "creditAmount",
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
              style={styles.input}
            />
            {errors.creditAmount && (
              <span style={styles.error}>{errors.creditAmount}</span>
            )}
          </label>

          <label style={styles.label}>
            Bank Name:
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              style={styles.input}
            />
            {errors.bankName && (
              <span style={styles.error}>{errors.bankName}</span>
            )}
          </label>

          <label style={styles.label}>
            Date:
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              style={styles.input}
            />
            {errors.date && <span style={styles.error}>{errors.date}</span>}
          </label>

          <div style={styles.footer}>
            <Button
              label={"Submit"}
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

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%", // or fixed height like "500px"
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  closeButton: {
    backgroundColor: "#fff",
    border: "2px solid red",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "red",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    color: "#333",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #aaa",
  },
  error: {
    color: "#b90303",
    fontSize: "0.875rem",
    marginTop: "4px",
  },
  footer: {
    display: "flex",
    marginTop: "50px",
    width: "200%",
  },
};

export default SalaryCreditPopupCard;
