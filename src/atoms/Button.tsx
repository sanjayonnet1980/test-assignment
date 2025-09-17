import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;