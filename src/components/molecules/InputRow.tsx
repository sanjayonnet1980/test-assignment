import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { InputProps } from "./PopupSalaryCardForm";

interface InputRowProps {
  index: number;
  input: InputProps;
  onChange: (index: number, field: keyof InputProps, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isLast: boolean;
}

export const InputRow: React.FC<InputRowProps> = ({
  index,
  input,
  onChange,
  onAdd,
  onRemove,
  isLast,
}) => {
  return (
    <div className="input-row">
      <input
        type="text"
        value={input.reason}
        onChange={(e) => onChange(index, "reason", e.target.value)}
        placeholder={`Reason ${index + 1}`}
      />
      <input
        type="number"
        value={input.amount}
        onChange={(e) => onChange(index, "amount", e.target.value)}
        placeholder={`Amount ${index + 1}`}
      />
      <div className="input-actions">
        {isLast ? (
          <button
            type="button"
            className="add-button tooltip"
            data-tooltip="Add more"
            onClick={onAdd}
          >
            <Plus size={20} color="#28a745" />
          </button>
        ) : (
          <button
            type="button"
            className="add-button tooltip"
            data-tooltip="Delete Input"
            onClick={() => onRemove(index)}
          >
            <Trash2 size={20} color="#dc3545" />
          </button>
        )}
      </div>
    </div>
  );
};