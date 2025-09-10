import { useState, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { addCreditCard } from "../features/creditCard/creditCardSlice";
import { CalendarDate, ArrowLeftCircle } from "react-bootstrap-icons";
import SlidingHeaderText from "../atoms/SlidingText";

const initialRow = {
  cardNumber: "",
  amount: "",
  date: "",
  comments: "",
  mode: "",
};

type CreditCardRow = {
  cardNumber: string;
  amount: string;
  date: string;
  comments: string;
  mode: string;
};

const AddCreditCardForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([initialRow]);
  const [loading, setLoading] = useState(false);
  const dateRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    index: number,
    field: keyof CreditCardRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: field === "cardNumber" ? value.replace(/\D/g, "") : value,
    };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, initialRow]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const row of rows) {
        await dispatch(addCreditCard(row));
      }
      setRows([initialRow]);
    } finally {
      setLoading(false);
    }
  };

  const triggerDatePicker = (index: number) => {
    const input = dateRefs.current[index];
    if (input) {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
      }
    }
  };

  const setDateRef = (index: number) => (el: HTMLInputElement | null) => {
    if (el !== null) {
      dateRefs.current[index] = el;
    }
  };

  const handleRemoveRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const [suggestions] = useState<string[]>(["4188", "5549", "7577"]);
  const [suggestionsMode] = useState<string[]>(["cashback", "investment"]);

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the CreditCard Dashboard — Real-time updates ahead!" />
        </div>
        <div className="card-body">
          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{ margin: 0 }}>📇 Add Credit Card Information</h2>
            <button
              className="btn btn-outline-secondary"
              style={{ position: "absolute", top: "0.5rem", right: "1rem" }}
              onClick={() => navigate("/")}
              title="Back to Dashboard"
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 mr-5">
            {rows.map((row, index) => (
              <div
                key={index}
                className="form-row"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  name="cardNumber"
                  value={row.cardNumber}
                  onChange={(e) =>
                    handleChange(index, "cardNumber", e.target.value)
                  }
                  placeholder="Card #"
                  maxLength={4}
                  inputMode="numeric"
                  className="form-input"
                  autoComplete="off"
                  list="relation-cardnum"
                />
                <datalist id="relation-cardnum">
                  {suggestions.map((item, idx) => (
                    <option key={idx} value={item} />
                  ))}
                </datalist>
                <input
                  type="number"
                  name="amount"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                  placeholder="Amount"
                  className="form-input"
                  autoComplete="off"
                />
                <div
                  className="calendar-wrapper"
                  style={{ position: "relative", flex: 1 }}
                >
                  <input
                    type="date"
                    name="date"
                    ref={setDateRef(index)}
                    onClick={() => triggerDatePicker(index)}
                    value={row.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                    className="form-input"
                    style={{
                      paddingRight: "4.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <CalendarDate
                    size={20}
                    onClick={() => triggerDatePicker(index)}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#007bff",
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="comments"
                  value={row.comments}
                  onChange={(e) =>
                    handleChange(index, "comments", e.target.value)
                  }
                  placeholder="Comments"
                  className="form-input"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="mode"
                  value={row.mode}
                  onChange={(e) => handleChange(index, "mode", e.target.value)}
                  placeholder="Mode"
                  className="form-input"
                  autoComplete="off"
                  list="relation-mode"
                />
                <datalist id="relation-mode">
                  {suggestionsMode.map((item, idx) => (
                    <option key={idx} value={item} />
                  ))}
                </datalist>
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="btn btn-outline-danger"
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
                    title="Remove this row"
                  >
                    ❌
                  </button>
                )}
                {index === rows.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddRow}
                  >
                    ➕
                  </button>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="form-button"
              disabled={loading}
              style={{ width: '100%'}}
            >
              {loading ? "Adding..." : "Add Credit Card Information"}
            </button>

            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
          </form>
        </div>
        <div className="card-footer text-muted">Updated just now</div>
      </div>
    </div>
  );
};

export default AddCreditCardForm;
