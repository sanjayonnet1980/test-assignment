import React from "react";

interface Props {
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const RowCheckbox: React.FC<Props> = ({ checked, onToggle, disabled = false }) => {
  return (
    <input
      type="checkbox"
      className="form-check-input"
      checked={checked}
      onChange={onToggle}
      disabled={disabled}
    />
  );
};

export default RowCheckbox;