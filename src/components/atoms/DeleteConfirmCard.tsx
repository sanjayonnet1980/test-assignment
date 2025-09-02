import React from "react";

interface DeleteConfirmCardProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const DeleteConfirmCard: React.FC<DeleteConfirmCardProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message = "Are you sure you want to delete this entry?",
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h3 style={styles.title}>Confirm Deletion</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={styles.confirmBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "360px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#dc2626",
  },
  message: {
    fontSize: "0.95rem",
    marginBottom: "20px",
    color: "#374151",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  confirmBtn: {
    padding: "8px 16px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DeleteConfirmCard;