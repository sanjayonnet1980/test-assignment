import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import AddRemoveButtons from "../WheatItems/AddRemoveButtons";
import { stockProductTypes } from "../../types/product";

interface stocksRowProps {
  index: number;
  data: {
    clientName: string;
    quantityKg: number;
    pricePerKg: number;
    purchaseDate: string;
    productName: string;
    clientMno: string;
  };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  addMore: boolean;
  onAdd: () => void;
}

const StocksRow: React.FC<stocksRowProps> = ({
  index,
  data,
  onChange,
  onRemove,
  canRemove,
  onAdd,
  addMore,
}) => {
  return (
    <div className="d-flex align-items-center gap-3 mb-2">
      <div className="form-group">
        <input
          type="text"
          name="clientName"
          placeholder="clientName"
          className="form-control"
          value={data.clientName}
          autoComplete="off"
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Client Name:
        </label>
      </div>
      <div className="form-group">
        <input
          type="number"
          name="quantityKg"
          placeholder="Qty (kg)"
          className="form-control"
          autoComplete="off"
          value={data.quantityKg}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Product Quantity:
        </label>
      </div>
      <div className="form-group">
        <input
          type="number"
          name="pricePerKg"
          placeholder="₹/kg"
          className="form-control"
          autoComplete="off"
          value={data.pricePerKg}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Product Price:
        </label>
      </div>
      <div className="form-group">
        <input
          type="date"
          name="purchaseDate"
          className="form-control"
          autoComplete="off"
          value={data.purchaseDate}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Recieving Date:
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="clientMno"
          placeholder="Mobile Number"
          className="form-control"
          value={data.clientMno}
          autoComplete="off"
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
            const input = {
              target: {
                name: "clientMno",
                value: onlyDigits,
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(index, input);
          }}
          maxLength={10}
          inputMode="numeric"
        />

        <label htmlFor="name" className="fw-bold text-muted">
          Mobile Number:
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="productName"
          placeholder="productName"
          className="form-control"
          value={data.productName}
          onChange={(e) => onChange(index, e)}
          list="productname-options"
          autoComplete="off"
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Product Name:
        </label>
        <datalist id="productname-options">
          {stockProductTypes.map((item, idx) => (
            <option key={idx} value={item} />
          ))}
        </datalist>
      </div>
      <div className="mt-2">
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
      {addMore && <AddRemoveButtons onAdd={onAdd} />}
    </div>
  );
};

export default StocksRow;
