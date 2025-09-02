// Header.tsx
import React from "react";
import { styles } from "./styles";

type Props = {
  onClose: () => void;
};

const Header: React.FC<Props> = ({ onClose }) => (
  <div style={styles.header}>
    <h2 style={{ margin: 0, color: "green" }}>Salary Investment Details</h2>
    <button onClick={onClose} style={styles.closeButton}>✕</button>
  </div>
);

export default Header;