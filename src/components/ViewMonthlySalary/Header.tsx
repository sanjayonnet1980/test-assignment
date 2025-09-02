import React from "react";
import { styles } from "./styles";

type Props = {
  title: string;
  onClose: () => void;
};

const Header: React.FC<Props> = ({ title, onClose }) => (
  <div style={styles.header}>
    <h2 style={{ margin: 0, color: "green" }}>{title}</h2>
    <button onClick={onClose} style={styles.closeButton}>×</button>
  </div>
);

export default Header;