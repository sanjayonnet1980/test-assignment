import React, { useState } from "react";
import EntryForm from "./EntryForm";

type Tab = "Card 4188" | "Card 5549" | "Card 7577";

interface TabbedFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TabbedFormPopup: React.FC<TabbedFormPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("Card 4188");

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeIcon} onClick={onClose}>
          ×
        </button>
        <div style={styles.tabHeader}>
          <button
            style={activeTab === "Card 4188" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("Card 4188")}
          >
            Credit Card 4188
          </button>
          <button
            style={activeTab === "Card 5549" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("Card 5549")}
          >
            Credit Card 5549
          </button>
          <button
            style={activeTab === "Card 7577" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("Card 7577")}
          >
            Credit Card 7577
          </button>
        </div>

        <div style={styles.formContainer}>
          {activeTab === "Card 4188" && (
            <EntryForm
              buttonLabel="Submit Card 4188"
              onClose={onClose}
            />
          )}

          {activeTab === "Card 5549" && (
            <EntryForm
              buttonLabel="Submit Card 5549"
              onClose={onClose}
            />
          )}

          {activeTab === "Card 7577" && (
            <EntryForm
              buttonLabel="Submit Card 7577"
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  openButton: {
    padding: "10px 16px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    overflow: "visible",
  },
  popup: {
    backgroundColor: "#fff",
    zIndex: 9,
    padding: "20px 40px 0px 20px",
    borderRadius: "8px",
    width: "430px",
    height: "410px",
    position: "relative",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
  },
  closeIcon: {
    position: "absolute",
    top: "12px",
    right: "12px",
    paddingLeft: "30px",
    fontSize: "1.25rem",
    backgroundColor: "#fff",
    border: "2px solid red",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
    width: '25px',
    height: '25px',
    color: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabHeader: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "16px",
  },
  tab: {
    padding: "8px 8px",
    backgroundColor: "#eee",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  activeTab: {
    padding: "8px 16px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    padding: "15px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "8px",
    width: "106%",
  },
};

export default TabbedFormPopup;
