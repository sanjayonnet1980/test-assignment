import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  classname: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, classname, disabled }) => {
  return (
    <button className={classname} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;