import React, { useState } from "react";

interface CardFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIPCardForm: React.FC<CardFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || amount === "") return;
    setName("");
    setAmount("");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              style={styles.input}
              required
            />
          </div>

          <div style={styles.footer}>
            <button type="submit" style={styles.button}>
              Submit SIP Details
            </button>
          </div>
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
    height: "280px",
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
    marginTop: "auto",
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
};

export default SIPCardForm;
