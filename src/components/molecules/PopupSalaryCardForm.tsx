// components/PopupCardForm.tsx
import React, { useState } from "react";
import "./PopupCardForm.css";
import { Plus, Trash2 } from "lucide-react";
import Button from "../atoms/Button";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";

interface PopupCardFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputProps {
  reason: string;
  amount: number;
}

export const PopupCardForm: React.FC<PopupCardFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputs, setInputs] = useState<InputProps[]>([
    { reason: "", amount: 0.0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    index: number,
    field: "reason" | "amount",
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
    setInputs((prev) => [...prev, { reason: "", amount: 0.0 }]);
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
      } catch (err) {
        toast.error("❌ Submission failed.");
      } finally {
        setIsLoading(false);
      }
    }
    setInputs([{ reason: "", amount: 0.0 }])
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <form onSubmit={handleSubmit}>
        <div className="popup-salarycard">
          <header className="popup-header">
            <h2>Add Salary Investment Details</h2>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </header>
          {inputs.map((input, index) => (
            <div key={index} className="input-row">
              <input
                type="text"
                value={input.reason}
                onChange={(e) =>
                  handleInputChange(index, "reason", e.target.value)
                }
                placeholder={`reason ${index + 1}`}
              />
              <input
                type="number"
                value={input.amount}
                onChange={(e) =>
                  handleInputChange(index, "amount", e.target.value)
                }
                placeholder={`Amount ${index + 1}`}
              />
              <div className="input-actions">
                {index === inputs.length - 1 ? (
                  <button
                    type="button"
                    className="add-button tooltip"
                    data-tooltip="Add more"
                    onClick={handleAddInput}
                  >
                    <Plus size={20} color="#28a745" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="add-button tooltip"
                    data-tooltip="Delete Input"
                    onClick={() => handleRemoveInput(index)}
                  >
                    <Trash2 size={20} color="#dc3545" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <Button
            label={"Submit"}
            onClick={() => handleSubmit}
            classname="submitForm-button fullwidth"
            disabled={false}
          />
        </div>
        {isLoading && <Loader overlay color="#10b981" size={48} />}
      </form>
    </div>
  );
};
