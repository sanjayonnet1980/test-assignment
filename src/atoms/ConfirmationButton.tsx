import React from "react";
import { Check2 } from "react-bootstrap-icons";

interface ConfirmButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  label = "Confirm",
  className = "",
}) => {
  return (
    <button
      className={`btn btn-success btn-sm d-flex align-items-center gap-1 ${className}`}
      onClick={onClick}
      title={label}
      style={{background: '#198754'}}
    >
      <Check2 size={16} />
      {label}
    </button>
  );
};

export default ConfirmButton;