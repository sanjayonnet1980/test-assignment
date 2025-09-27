import React from "react";

interface AtomButtonProps {
  label: string;
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  outline?: boolean;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties; // ✅ Optional inline styles
}

const AtomButton: React.FC<AtomButtonProps> = ({
  label,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  outline = true,
  className = "",
  disabled = false,
  title,
  style = {}, // ✅ Default to empty object
}) => {

  const defaultStyle: React.CSSProperties = {
    minHeight: "42px",
    cursor: disabled ? "not-allowed" : "pointer",
    display: 'inline-flex',
    justifyContent: 'center',
    ...style, // ✅ Merge custom styles
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`gap-2 ${className}`}
      style={defaultStyle}
      title={title}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default AtomButton;