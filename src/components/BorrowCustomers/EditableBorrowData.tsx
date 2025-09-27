import React from "react";
import { Check2, X } from "react-bootstrap-icons";
import { BorrowCustomers } from "../../features/BorrowCustomers/borrowCustomers";

interface Props {
  editData: BorrowCustomers;
  onChange: (field: keyof BorrowCustomers, value: string | number) => void;
  onSave: (updated: BorrowCustomers) => void;
  onCancel: () => void;
}

const EditableBorrowData: React.FC<Props> = ({
  editData,
  onChange,
  onSave,
  onCancel,
}) => {
  const totalCost = editData.quantityKg * editData.pricePerKg;

  return (
    <tr>
      <td className="border">
        <input
          type="text"
          value={editData.customeName}
          onChange={(e) => onChange("customeName", e.target.value)}
          className="form-input"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={editData.quantityKg}
          onChange={(e) => onChange("quantityKg", +e.target.value)}
          className="form-input"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={editData.pricePerKg}
          onChange={(e) => onChange("pricePerKg", +e.target.value)}
          className="form-input"
        />
      </td>
      <td>{totalCost}</td>
      <td className="border">
        <input
          type="date"
          value={editData.purchaseDate}
          onChange={(e) => onChange("purchaseDate", e.target.value)}
          className="form-input"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={editData.mobileNumber}
          onChange={(e) => onChange("mobileNumber", +e.target.value)}
          className="form-input"
        />
      </td>
      <td className="border">
        <input
          type="text"
          value={editData.customerAddress}
          onChange={(e) => onChange("customerAddress", e.target.value)}
          className="form-input"
        />
      </td>
      <td align="center" className="d-flex gap-3 p-3">
        <button
          className="btn btn-outline-success"
          onClick={() => onSave(editData)}
        >
          <Check2 size={20} />
        </button>
        <button className="btn btn-outline-warning" onClick={onCancel}>
          <X size={20} />
        </button>
      </td>
    </tr>
  );
};

export default EditableBorrowData;
