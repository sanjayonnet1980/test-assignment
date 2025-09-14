import React from "react";
import MonthlyInvRow from "./MonthlyInvRow";

interface Props {
  data: any[];
  editId: string | null;
  editForm: any;
  blinkRowId: string | null;
  onEditClick: (item: any) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDeleteClick: (id: string) => void;
}

const MonthlyInvTable: React.FC<Props> = ({
  data,
  editId,
  editForm,
  blinkRowId,
  onEditClick,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDeleteClick,
}) => {
  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>Paid From</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Paid to</th>
          <th>Reason</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={6}
              style={{ textAlign: "center", padding: "1rem", color: "#888" }}
            >
              No investment records available for this period.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <MonthlyInvRow
              key={item.id}
              investment={item}
              isEditing={editId === item.id.toString()}
              editForm={editForm}
              onEditClick={() => onEditClick(item)}
              onEditChange={onEditChange}
              onEditSave={onEditSave}
              onEditCancel={onEditCancel}
              onDeleteClick={() => onDeleteClick(item.id.toString())}
              blink={blinkRowId === item.id.toString()}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default MonthlyInvTable;
