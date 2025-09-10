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
}) => {
  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>Card Number</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Comments - Vendor</th>
          <th>Transaction Mode</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
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
          />
        ))}
      </tbody>
    </table>
  );
};

export default CreditCardTable;
