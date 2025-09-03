import React from "react";
import styles from "./tabbedFormPopup.module.css";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={isActive ? styles.activeTab : styles.tab}
    onClick={onClick}
  >
    {label}
  </button>
);

export default TabButton;