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
  const [mode, setMode] = useState("Invest");
  const newErrors: { [key: string]: string } = {};
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name.trim() || !amount || !date || !vendor.trim()) {
      if (!name.trim()) newErrors.name = "Name is required.";
      if (!vendor.trim()) newErrors.vendor = "Investment place is required.";
      if (!date) newErrors.date = "Date is required.";
      if (amount === "" || amount <= 0)
        newErrors.amount = "Amount must be greater than 0.";
      setErrors(newErrors);
      setIsLoading(false);
    } else {
      const url =
        "https://script.google.com/macros/s/AKfycbzrLLDnuAt9J4pVtZa9jOvDit3B-1ifRwea3yw8Eks0UENJzkmhUvya9BoG0TLw3Ag/exec";
      const formattedData = new URLSearchParams({
        name: name.toString(),
        amount: amount.toFixed(2),
        date: date.toString(),
        vendor: vendor.toString(),
        cardno: buttonLabel ? buttonLabel.slice(-4).toString() : "",
        mode: mode.toString(),
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
        setVendor("");
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
    }
  };

  const handleButtonSubmit = () => {};
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
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
          />
          {errors.amount && <span style={styles.error}>{errors.amount}</span>}
        </label>
        <label style={styles.label}>
          Investment Place:
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            style={styles.input}
          />
          {errors.vendor && <span style={styles.error}>{errors.vendor}</span>}
        </label>
        <label style={styles.label}>
          Investment Mode:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={styles.input}
          >
            <option value="invest">Invest</option>
            <option value="cashback">Cashback</option>
          </select>
        </label>
        <label style={styles.label}>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          {errors.date && <span style={styles.error}>{errors.date}</span>}
        </label>
      </form>
      <div style={styles.button}>
        <Button
          label={buttonLabel || ""}
          onClick={handleButtonSubmit}
          classname="submitForm-button"
          disabled={false}
        />
      </div>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
  form: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  error: {
    color: "#b90303",
    fontSize: "0.875rem",
    marginTop: "4px",
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
    color: "#fff",
    border: "none",
    width: "200%",
    marginTop: "20px",
    display: "flex",
    justifyContent: "left",
  },
};

export default EntryForm;
