import React from "react";
import { SellEntry } from "../../types/product";
import { Trash } from "react-bootstrap-icons";

interface Props {
  entry: SellEntry;
  onDelete: (id: string) => void;
}

const SellProductRow: React.FC<Props> = ({ entry, onDelete }) => {
  const total = entry.quantityKg * entry.pricePerKg;

  return (
      <tr className="border fw-bold text-success">
        <td style={{ textTransform: "capitalize" }}>{entry.product}</td>
        <td>{entry.quantityKg}</td>
        <td>{entry.pricePerKg}</td>
        <td>{total.toFixed(2)}</td>
        <td>{entry.date}</td>
        <td>{entry.time}</td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(entry.id)}
          >
            <Trash size={20} />
          </button>
        </td>
      </tr>
  );
};

export default SellProductRow;
