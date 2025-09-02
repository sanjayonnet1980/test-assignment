import React, { useState } from "react";
import { fetchPostSIP } from "../../utils/fetchPostSIP";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";

interface CardFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface formProps {
  sipName: string;
  amount: number;
  folioNumber: string;
}

const SIPCardForm: React.FC<CardFormProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<formProps>({
    sipName: "",
    amount: 0,
    folioNumber: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ folioNumber?: string }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // reset errors

    const { sipName, amount, folioNumber } = form;
    if (!sipName || amount <= 0 || folioNumber.toString().length < 8) {
      toast.error("Please enter valid SIP details", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    const result = await fetchPostSIP(form);
    if (result) {
      toast.success("Data Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
      setForm({ sipName: "", amount: 0, folioNumber: "" });
      setIsLoading(false);
    }
    onClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "folioNumber" ? Number(value) : value,
    }));
    if(name==="folioNumber" && value.length >= 8){
       setErrors({}); // reset errors
    }else if(name==="folioNumber" && value.length < 8){
      setErrors({ folioNumber: "Folio Number must be at least 8 digits" });
    }
  };

  if (!isOpen) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.heading}>Add SIP Details</h2>
        <form onSubmit={handleSubmit} style={styles.card}>
          <button style={styles.closeIcon} onClick={onClose}>
            ×
          </button>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="sipName"
              value={form.sipName}
              onChange={handleOnChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Folio Number</label>
            <input
              type="number"
              name="folioNumber"
              value={form.folioNumber}
              onChange={handleOnChange}
              style={{
                ...styles.input,
                borderColor: errors.folioNumber ? "red" : "#aaa",
              }}
              required
            />
            {errors.folioNumber && (
              <span style={styles.errorText}>{errors.folioNumber}</span>
            )}
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleOnChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.footer}>
            <button type="submit" style={styles.button}>
              Submit SIP Details
            </button>
          </div>
          {isLoading && <Loader overlay color="#10b981" size={48} />}
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "sans-serif",
    maxWidth: "300px",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
    fontSize: "1.05rem",
    color: "green",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    overflow: "visible",
  },
  popup: {
    backgroundColor: "#fff",
    zIndex: 9,
    padding: "20px 40px 0px 20px",
    borderRadius: "8px",
    width: "330px",
    height: "380px",
    position: "relative",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
  },
  closeIcon: {
    position: "absolute",
    top: "12px",
    right: "12px",
    paddingLeft: "30px",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "red",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "4px",
    color: "#333",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #aaa",
    fontSize: "1rem",
  },
  footer: {
    marginTop: "50px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(to right, #bc723c, #e02ab2)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    fontSize: "0.85rem",
    marginTop: "4px",
  },
};

export default SIPCardForm;
