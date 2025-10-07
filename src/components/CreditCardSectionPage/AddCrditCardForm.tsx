import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { addCreditCard } from "../../features/creditCard/creditCardSlice";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import SlidingHeaderText from "../../atoms/SlidingText";
import { CreditCardRow, initialRow } from "../../types/creditCardTypes";
import { useDateRefTrigger } from "../../utils/datesetRefTrigger";
import { useSuggestionMode } from "../../utils/suggestionMode";
import CreditCardRowForm from "./CreditCardRowForm";
import { validateRow } from "../../utils/validationRow";
import ViewCreditCardPage from "./ViewCreditCardPage";

const AddCreditCardForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([initialRow]);
  const [loading, setLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  
  const handleChange = (
    index: number,
    field: keyof CreditCardRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    const sanitizedValue =
      field === "cardNumber" ? value.replace(/\D/g, "") : value;

    updatedRows[index] = {
      ...updatedRows[index],
      [field]: sanitizedValue,
    };

    setRows(updatedRows);

    // ✅ Validate the updated rows, not the stale state
    const validationResults = updatedRows.map(validateRow);
    setErrors(validationResults);
  };

  const handleAddRow = () => {
    setRows([...rows, initialRow]);
    setErrors([...errors, initialRow]); // Add blank error row
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRefreshTable((prev) => !prev);
    const validationResults = rows.map(validateRow);
    setErrors(validationResults);

    // ✅ Check if any field has an error
    const hasErrors = validationResults.some((rowErrors) =>
      Object.values(rowErrors).some((msg) => msg !== "")
    );

    if (hasErrors) {
      return; // ⛔ Stop submission if errors exist
    }

    setLoading(true);
    try {
      for (const row of rows) {
        await dispatch(addCreditCard(row));
      }
      setRows([initialRow]);
      setErrors([initialRow]); // ✅ Reset errors after successful submit
    } finally {
      setLoading(false);
    }
  };

  const { triggerDatePicker, setDateRef } = useDateRefTrigger();

  const handleRemoveRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const [errors, setErrors] = useState<CreditCardRow[]>([initialRow]);

  const { suggestions, suggestionsMode } = useSuggestionMode();
  return (
    <div className="page-container">
      <div className="card border border border-warning">
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
              style={{ position: "absolute", top: "0.3rem", right: "0.2rem" }}
              onClick={() => navigate("/personal")}
              title="Back to Dashboard"
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 mr-5">
            {rows.map((row, index) => (
              <CreditCardRowForm
                key={index}
                index={index}
                row={row}
                errors={errors[index]}
                suggestions={suggestions}
                suggestionsMode={suggestionsMode}
                isLast={index === rows.length - 1}
                onChange={handleChange}
                onRemove={handleRemoveRow}
                onAdd={handleAddRow}
                triggerDatePicker={triggerDatePicker}
                setDateRef={setDateRef}
              />
            ))}

            <button
              type="submit"
              className="form-button"
              disabled={loading}
              style={{ width: "100%" }}
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
        <ViewCreditCardPage refreshTrigger={refreshTable}/>
      </div>
    </div>
  );
};

export default AddCreditCardForm;
