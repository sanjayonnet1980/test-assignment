import React from "react";
import CreditCardRow from "./CreditCardRow";

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
  selectedIds: string[];
  onSelectRow: (id: string, isChecked: boolean) => void;
  onSelectAll: (isChecked: boolean) => void;
}

const CreditCardTable: React.FC<Props> = ({
  data,
  editId,
  editForm,
  blinkRowId,
  onEditClick,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDeleteClick,
  selectedIds,
  onSelectRow,
  onSelectAll,
}) => {
  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={
                data.length > 0 &&
                data.every((item) => selectedIds.includes(item.id.toString()))
              }
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </th>

          <th>Card Number</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Comments - Vendor</th>
          <th>Transaction Mode</th>
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
            <CreditCardRow
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
              selectedIds={selectedIds}
              onSelectRow={onSelectRow}
              onSelectAll={onSelectAll}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default CreditCardTable;
