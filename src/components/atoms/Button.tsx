import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  classname: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, classname }) => {
  return (
    <button className={classname} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;