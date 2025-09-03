import React, { useState } from "react";
import FormField from "./FormField";
import { validateForm } from "./formValidation";
import styles from "./entryForm.module.css";
import { toast } from "react-toastify";
import Loader from "../../atoms/Loader";
import Button from "../../atoms/Button";

interface EntryFormProps {
  buttonLabel?: string;
  onClose: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ buttonLabel, onClose }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [mode, setMode] = useState("Invest");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateForm(name, amount, date, vendor);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const url = "https://script.google.com/macros/s/AKfycbzrLLDnuAt9J4pVtZa9jOvDit3B-1ifRwea3yw8Eks0UENJzkmhUvya9BoG0TLw3Ag/exec";
    const formattedData = new URLSearchParams({
      name,
      amount: amount !== "" ? amount.toFixed(2) : "0.00",
      date,
      vendor,
      cardno: buttonLabel ? buttonLabel.slice(-4) : "",
      mode,
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formattedData.toString(),
      });
      await res.text();
      toast.success("Submitted successfully!");
      setName("");
      setAmount("");
      setDate("");
      setVendor("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField label="Name:" error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </FormField>

        <FormField label="Amount:" error={errors.amount}>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))
            }
            className={styles.input}
          />
        </FormField>

        <FormField label="Investment Place:" error={errors.vendor}>
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className={styles.input}
          />
        </FormField>

        <FormField label="Investment Mode:">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={styles.input}
          >
            <option value="invest">Invest</option>
            <option value="cashback">Cashback</option>
          </select>
        </FormField>

        <FormField label="Date:" error={errors.date}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
        </FormField>

        <div className={styles.buttonGroup}>
          <Button
            label={buttonLabel || "Submit"}
            classname="submitForm-button"
            disabled={isLoading}
            onClick={()=>{}}
          />
        </div>
      </form>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </div>
  );
};

export default EntryForm;