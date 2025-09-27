import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import AddRemoveButtons from "../WheatItems/AddRemoveButtons";

interface borrowCustomersRowProps {
  index: number;
  data: {
    customeName: string;
    quantityKg: string;
    pricePerKg: string;
    purchaseDate: string;
    customerAddress: string;
    mobileNumber: string;
  };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  addMore: boolean;
  onAdd: () => void;
}

const BorrowCustomersRow: React.FC<borrowCustomersRowProps> = ({
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
          name="customeName"
          placeholder="customeName"
          className="form-control"
          value={data.customeName}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Customer Name:
        </label>
      </div>
      <div className="form-group">
        <input
          type="number"
          name="quantityKg"
          placeholder="Qty (kg)"
          className="form-control"
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
          value={data.purchaseDate}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Date:
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          className="form-control"
          value={data.mobileNumber}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
            const input = {
              target: {
                name: "mobileNumber",
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
          name="customerAddress"
          placeholder="customerAddress"
          className="form-control"
          value={data.customerAddress}
          onChange={(e) => onChange(index, e)}
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Customer Address:
        </label>
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

export default BorrowCustomersRow;
