import React from "react";
import { PencilSquare, Trash, Check2, X } from "react-bootstrap-icons";

interface Props {
  investment: any;
  isEditing: boolean;
  editForm: any;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDeleteClick: () => void;
  blink: boolean;
}

const MonthlyInvRow: React.FC<Props> = ({
  investment,
  isEditing,
  editForm,
  onEditChange,
  onEditClick,
  onEditSave,
  onEditCancel,
  onDeleteClick,
  blink,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <tr className={blink ? "blink-row" : ""}>
      {isEditing ? (
        <>
          <td><input name="source" value={editForm.source} onChange={onEditChange} className="form-control" /></td>
          <td>
            <div className="input-with-icon">
              <span className="rupee-icon">₹</span>
              <input
                name="amount"
                value={editForm.amount}
                onChange={onEditChange}
                onBlur={() =>
                  onEditChange({
                    target: {
                      name: "amount",
                      value: parseFloat(editForm.amount).toFixed(2),
                    },
                  } as any)
                }
                className="form-control"
              />
            </div>
          </td>
          <td><input name="date" value={editForm.date} onChange={onEditChange} className="form-control" /></td>
          <td><input name="vendor" value={editForm.vendor} onChange={onEditChange} className="form-control" /></td>
          <td><input name="reason" value={editForm.reason} onChange={onEditChange} className="form-control" /></td>
          <td style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-sm btn-success" onClick={onEditSave}><Check2 /></button>
            <button className="btn btn-sm btn-secondary" onClick={onEditCancel}><X /></button>
          </td>
        </>
      ) : (
        <>
          <td>{investment.source}</td>
          <td>₹ {parseFloat(investment.amount).toFixed(2)}</td>
          <td>{formatDate(investment.date)}</td>
          <td>{investment.vendor}</td>
          <td>{investment.reason}</td>
          <td style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-sm btn-outline-primary" onClick={onEditClick}><PencilSquare /></button>
            <button className="btn btn-sm btn-outline-danger" onClick={onDeleteClick}><Trash /></button>
          </td>
        </>
      )}
    </tr>
  );
};

export default MonthlyInvRow;