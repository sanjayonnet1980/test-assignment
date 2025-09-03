import React, { useState } from "react";
import "./PopupCardForm.css";
import { toast } from "react-toastify";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import { InputRow } from "./InputRow";

interface PopupCardFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InputProps {
  reason: string;
  amount: number;
}

export const PopupCardForm: React.FC<PopupCardFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputs, setInputs] = useState<InputProps[]>([{ reason: "", amount: 0 }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    index: number,
    field: keyof InputProps,
    value: string
  ) => {
    const updated = [...inputs];
    updated[index] = {
      ...updated[index],
      [field]: field === "amount" ? Number(value) : value,
    };
    setInputs(updated);
  };

  const handleAddInput = () => {
    setInputs((prev) => [...prev, { reason: "", amount: 0 }]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const nonEmpty = inputs.filter(
      (val) => val.reason.trim() !== "" || val.amount !== 0
    );

    if (nonEmpty.length > 0) {
      const payload = JSON.stringify(nonEmpty);
      const params = new URLSearchParams();
      params.append("contents", payload);

      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbzV8H-JfmOpdIqQwRdAtPk3slCaqw4qOlpZ-N_0Y4UBcQQhZjU4EMBxFTxli_jSRH_3/exec";

      try {
        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });
        toast.success("Submitted successfully!");
      } catch {
        toast.error("❌ Submission failed.");
      } finally {
        setIsLoading(false);
      }
    }

    setInputs([{ reason: "", amount: 0 }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <form onSubmit={handleSubmit}>
        <div className="popup-salarycard">
          <header className="popup-header">
            <h2>Add Salary Investment Details</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </header>

          {inputs.map((input, index) => (
            <InputRow
              key={index}
              index={index}
              input={input}
              onChange={handleInputChange}
              onAdd={handleAddInput}
              onRemove={handleRemoveInput}
              isLast={index === inputs.length - 1}
            />
          ))}

          <Button
            label="Submit"
            onClick={() => {}}
            classname="submitForm-button fullwidth"
            disabled={isLoading}
          />
        </div>
        {isLoading && <Loader overlay color="#10b981" size={48} />}
      </form>
    </div>
  );
};
