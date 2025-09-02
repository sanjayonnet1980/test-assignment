// Header.tsx
import React from "react";
import "./style.css";

type Props = {
  onClose: () => void;
};

const Header: React.FC<Props> = ({ onClose }) => (
  <header className="popup-header">
    <h2 style={{ margin: 0, color: "green" }}>Contact Details</h2>
    <button className="close-btn" onClick={onClose}>
      ×
    </button>
  </header>
);

export default Header;