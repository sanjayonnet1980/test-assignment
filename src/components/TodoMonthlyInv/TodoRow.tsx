import React from "react";
import { TrashFill } from "react-bootstrap-icons";
import AddRemoveButtons from "../WheatItems/AddRemoveButtons";

interface todoRowProps {
  index: number;
  data: {
    bankName: string;
    amount: string;
    month: string;
    toInvestment: string;
    reason: string;
  };
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  addMore: boolean;
  onAdd: () => void;
}

const TodoRow: React.FC<todoRowProps> = ({
  index,
  data,
  onChange,
  onRemove,
  canRemove,
  onAdd,
  addMore,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const banks = ["HDFC", "ICICI", "Axis", "SBI", "Kotak", "Canara", "Yes Bank"];

  return (
    <div className="d-flex align-items-center gap-3 mb-2">
      <div className="form-group">
        <input
          type="text"
          name="bankName"
          placeholder="bankName"
          className="form-control"
          value={data.bankName}
          onChange={(e) => onChange(index, e)}
          autoComplete="off"
          list={`bank-list-${index}`} // ✅ link to datalist
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Bank Name:
        </label>
        <datalist id={`bank-list-${index}`}>
          {banks.map((item, idx) => (
            <option key={idx} value={item} />
          ))}
        </datalist>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="amount"
          placeholder="amount"
          className="form-control"
          value={data.amount}
          onChange={(e) => onChange(index, e)}
          autoComplete="off"
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Amount:
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="month"
          placeholder="month"
          className="form-control"
          value={data.month}
          onChange={(e) => onChange(index, e)}
          list={`month-list-${index}`} // ✅ link to datalist
          autoComplete="off"
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Month:
        </label>
        <datalist id={`month-list-${index}`}>
          {months.map((item, idx) => (
            <option key={idx} value={item} />
          ))}
        </datalist>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="toInvestment"
          placeholder="toInvestment"
          className="form-control"
          value={data.toInvestment}
          onChange={(e) => onChange(index, e)}
          autoComplete="off"
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Investment Place:
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="reason"
          placeholder="reason"
          className="form-control"
          value={data.reason}
          onChange={(e) => onChange(index, e)}
          autoComplete="off"
        />
        <label htmlFor="name" className="fw-bold text-muted">
          Reason:
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

export default TodoRow;
