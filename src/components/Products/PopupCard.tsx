import React from "react";

interface PopupCardProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({ onConfirm, onCancel }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "2rem",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h5 className="mb-3">Clear customer entries?</h5>
      <p className="text-muted">This will reset the customer report view.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-danger" onClick={onConfirm}>
          Yes
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default PopupCard;