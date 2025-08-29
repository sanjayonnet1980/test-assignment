import React, { useState } from "react";
import Button from "../atoms/Button";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";

interface EntryFormProps {
  buttonLabel?: string;
  onClose: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ buttonLabel, onClose }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !amount || !date || vendor) return;
    const url =
      "https://script.google.com/macros/s/AKfycbzCq0XU1MM5JO0BBC2bXnwXxotN_sL-H5-rTGUUrPzP1H_AHBUcYZnboBCtdwaYCdxV/exec";
    const formattedData = new URLSearchParams({
      name: name.toString(),
      amount: amount.toFixed(2),
      date: date.toString(),
      vendor: vendor.toString(),
      cardno: buttonLabel ? buttonLabel.slice(-4).toString() : '',
      msg: 'creditcard'
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formattedData.toString(),
      });
      await res.text();

      toast.success("submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
      setName("");
      setAmount("");
      setDate("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <label style={styles.label}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
      </label>

      <label style={styles.label}>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))
          }
          style={styles.input}
          required
        />
      </label>

      <label style={styles.label}>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
      </label>
      <label style={styles.label}>
        Investment Place:
        <input
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          style={styles.input}
          required
        />
      </label>
      <div style={styles.button}>
        <Button
          label={buttonLabel || ""}
          onClick={handleButtonSubmit}
          classname="submitForm-button"
          disabled={false}
        />
      </div>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #aaa",
  },
  button: {
    marginTop: "50px",
    color: "#fff",
    border: "none",
    width: "200%",
  },
};

export default EntryForm;
