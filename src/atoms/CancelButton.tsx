import React from "react";
import { X } from "react-bootstrap-icons";

interface CancelButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  label = "Cancel",
  className = "",
}) => {
  return (
    <button
      className={`btn btn-secondary btn-sm d-flex align-items-center gap-1 ${className}`}
      onClick={onClick}
      title={label}
      style={{background: 'gray'}}
    >
      <X size={16} />
      {label}
    </button>
  );
};

export default CancelButton;