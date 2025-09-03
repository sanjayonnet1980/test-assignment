import React, { useState } from "react";
import TabButton from "./TabButton";
import TabPanel from "./TabPanel";
import styles from "./tabbedFormPopup.module.css";

type Tab = "Card 4188" | "Card 5549" | "Card 7577";

interface TabbedFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TabbedFormPopup: React.FC<TabbedFormPopupProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>("Card 4188");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeIcon} onClick={onClose}>×</button>

        <div className={styles.tabHeader}>
          {(["Card 4188", "Card 5549", "Card 7577"] as Tab[]).map((tab) => (
            <TabButton
              key={tab}
              label={`Credit ${tab}`}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <div className={styles.formContainer}>
          <TabPanel activeTab={activeTab} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TabbedFormPopup;