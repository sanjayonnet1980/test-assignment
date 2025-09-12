import React from "react";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  list?: string;
}

const ContactFormInput: React.FC<props> = ({
  label,
  name,
  value,
  onChange,
  error,
  ...rest
}) => (
  <div className="form-group">
    {error && (
      <span id={`${name}-error`} className="error-text">
        {error}
      </span>
    )}
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
      {...rest}
    />
    <label htmlFor={name} className="fw-bold text-muted">
      {label}
    </label>
  </div>
);

export default React.memo(ContactFormInput);
