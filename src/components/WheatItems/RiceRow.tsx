import React from "react";
import { TrashFill } from "react-bootstrap-icons";

interface riceRowProps {
  index: number;
  data: {
    buyerName: string;
    quantityKg: string;
    pricePerKg: string;
    purchaseDate: string;
  };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const RiceRow: React.FC<riceRowProps> = ({ index, data, onChange, onRemove, canRemove }) => {
  return (
    <div className="d-flex align-items-center gap-3 mb-2">
    <div className="form-group">
      <input
        type="text"
        name="buyerName"
        placeholder="Buyer"
        className="form-control"
        value={data.buyerName}
        onChange={(e) => onChange(index, e)}
        required
      />
      <label htmlFor="name" className="fw-bold text-muted">Buyer Name:</label>
      </div>
      <div className="form-group">
      <input
        type="number"
        name="quantityKg"
        placeholder="Qty (kg)"
        className="form-control"
        value={data.quantityKg}
        onChange={(e) => onChange(index, e)}
        required
      />
      <label htmlFor="name" className="fw-bold text-muted">Product Quantity:</label>
      </div>
      <div className="form-group">
      <input
        type="number"
        name="pricePerKg"
        placeholder="₹/kg"
        className="form-control"
        value={data.pricePerKg}
        onChange={(e) => onChange(index, e)}
        required
      />
      <label htmlFor="name" className="fw-bold text-muted">Product Price:</label>
      </div>
      <div className="form-group">
      <input
        type="date"
        name="purchaseDate"
        className="form-control"
        value={data.purchaseDate}
        onChange={(e) => onChange(index, e)}
        required
      />
      <label htmlFor="name" className="fw-bold text-muted">Date:</label>
      </div>
      <div className="mt-4">
        {canRemove && (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onRemove(index)}
          title="Delete row"
        >
          <TrashFill />
        </button>
      )}
      </div>
    </div>
  );
};

export default RiceRow;