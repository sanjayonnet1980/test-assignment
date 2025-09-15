import React from "react";
import { Check2, X } from "react-bootstrap-icons";
import { BuyWheatEntry } from "../../features/WheatItems/buyWheatSlice";

interface Props {
  editData: BuyWheatEntry;
  onChange: (field: keyof BuyWheatEntry, value: string | number) => void;
  onSave: (updated: BuyWheatEntry) => void;
  onCancel: () => void;
}

const EditableRow: React.FC<Props> = ({
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
          value={editData.buyerName}
          onChange={(e) => onChange("buyerName", e.target.value)}
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
      <td align="center" className="d-flex gap-3 p-3">
        <button className="btn btn-outline-success" onClick={() => onSave(editData)}>
          <Check2 size={20} />
        </button>
        <button className="btn btn-outline-warning" onClick={onCancel}>
          <X size={20} />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
