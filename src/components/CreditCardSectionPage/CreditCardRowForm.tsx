// components/CreditCardRow.tsx
import { CalendarDate, Plus, X } from "react-bootstrap-icons";
import { CreditCardRow } from "../../types/creditCardTypes";

type Props = {
  index: number;
  row: CreditCardRow;
  errors: CreditCardRow;
  suggestions: string[];
  suggestionsMode: string[];
  isLast: boolean;
  onChange: (index: number, field: keyof CreditCardRow, value: string) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  triggerDatePicker: (index: number) => void;
  setDateRef: (index: number) => (el: HTMLInputElement | null) => void;
};

const CreditCardRowForm = ({
  index,
  row,
  errors,
  suggestions,
  suggestionsMode,
  isLast,
  onChange,
  onRemove,
  onAdd,
  triggerDatePicker,
  setDateRef,
}: Props) => {
  return (
    <div
      className="form-row"
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1rem",
        alignItems: "center",
      }}
    >
      {/* Card Number */}
      <div className="form-group">
        {errors.cardNumber && (
          <small className="text-danger d-block mt-1">
            {errors.cardNumber}
          </small>
        )}
        <input
          type="text"
          name="cardNumber"
          value={row.cardNumber}
          onChange={(e) => onChange(index, "cardNumber", e.target.value)}
          placeholder="Card #"
          maxLength={4}
          inputMode="numeric"
          className={`form-input mt-2 ${errors.cardNumber ? "input-error" : ""}`}
          autoComplete="off"
          list="relation-cardnum"
        />
        <label
          htmlFor={`cardNumber-${index}`}
          className="fw-bold text-muted text-start  mt-2"
        >
          Card Number
        </label>
        <datalist id="relation-cardnum">
          {suggestions.map((item, idx) => (
            <option key={idx} value={item} />
          ))}
        </datalist>
      </div>

      {/* Amount */}
      <div className="form-group">
        {errors.amount && (
          <small className="text-danger  mt-2 d-block mt-1">{errors.amount}</small>
        )}
        <input
          type="number"
          name="amount"
          value={row.amount}
          onChange={(e) => onChange(index, "amount", e.target.value)}
          placeholder="Amount"
          className={`form-input  mt-2 ${errors.amount ? "input-error" : ""}`}
          autoComplete="off"
        />
        <label
          htmlFor={`amount-${index}`}
          className="fw-bold text-muted text-start  mt-2"
        >
          Amount
        </label>
      </div>

      {/* Date */}
      <div
        className="calendar-wrapper"
        style={{ position: "relative", flex: 1 }}
      >
        <div className="form-group">
          {errors.date && (
            <small className="text-danger mt-2 d-block mt-1">{errors.date}</small>
          )}
          <input
            type="date"
            name="date"
            ref={setDateRef(index)}
            onClick={() => triggerDatePicker(index)}
            value={row.date}
            onChange={(e) => onChange(index, "date", e.target.value)}
            className={`form-input mt-2 ${errors.date ? "input-error" : ""}`}
            style={{
              paddingRight: "4.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            htmlFor={`date-${index}`}
            className="fw-bold mt-2 text-muted text-start"
          >
            Date
          </label>
        </div>
        <CalendarDate
          size={20}
          onClick={() => triggerDatePicker(index)}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: errors.date ? "50%" : "60%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#007bff",
          }}
        />
      </div>

      {/* Comments */}
      <div className="form-group">
        {errors.comments && (
          <small className="text-danger mt-2 d-block mt-1">{errors.comments}</small>
        )}
        <input
          type="text"
          name="comments"
          value={row.comments}
          onChange={(e) => onChange(index, "comments", e.target.value)}
          placeholder="Comments"
          className={`form-input mt-2 ${errors.comments ? "input-error" : ""}`}
          autoComplete="off"
        />
        <label
          htmlFor={`comments-${index}`}
          className="fw-bold mt-2 text-muted text-start"
        >
          Comments - Place to Invest
        </label>
      </div>

      {/* Mode */}
      <div className="form-group">
        {errors.mode && (
          <small className="text-danger mt-2 d-block mt-1">{errors.mode}</small>
        )}
        <input
          type="text"
          name="mode"
          value={row.mode}
          onChange={(e) => onChange(index, "mode", e.target.value)}
          placeholder="Mode"
          className={`form-input mt-2 ${errors.mode ? "input-error" : ""}`}
          autoComplete="off"
          list="relation-mode"
        />
        <label
          htmlFor={`mode-${index}`}
          className="fw-bold mt-2 text-muted text-start"
        >
          Mode of Invest
        </label>
        <datalist id="relation-mode">
          {suggestionsMode.map((item, idx) => (
            <option key={idx} value={item} />
          ))}
        </datalist>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop:
            errors.cardNumber ||
            errors.amount ||
            errors.comments ||
            errors.date ||
            errors.mode
              ? "0px"
              : "23px",
        }}
      >
        {!isLast && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="btn btn-outline-danger"
            title="Remove this row"
          >
            <X size={20} />
          </button>
        )}
        {isLast && (
          <button
            type="button"
            onClick={onAdd}
            className="btn btn-outline-success"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditCardRowForm;
