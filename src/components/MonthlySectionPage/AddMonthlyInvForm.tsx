import { useRef, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { Omit } from "utility-types";
import SlidingHeaderText from "../../atoms/SlidingText";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { CalendarDate } from "react-bootstrap-icons";
import { monthlyInv } from "../../types/mnthInv";
import { addMnthInv } from "../../features/MonthlyInv/monthlyInvSlice";

type MonthlyInvFormData = Omit<monthlyInv, "id">;

const AddMonthlyInvForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    source: "",
    date: "",
    amount: "",
    vendor: "",
    reason: "",
  });
  const dateRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    // Trigger native date picker
    dateRef.current?.showPicker?.() || dateRef.current?.focus();
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<MonthlyInvFormData, "id">>({
    source: "",
    date: "",
    amount: "",
    vendor: "",
    reason: "",
  });

  const validateForm = () => {
    const newErrors = {
      source:
        formData.source.trim().length < 4
          ? "source must be at least 4 characters."
          : "",
      amount:
        Number(formData.amount.trim()) <= 1
          ? "Amount must be at least 1 rupees."
          : "",
      date: formData.date.trim() === "" ? "required date." : "",
      vendor:
        formData.vendor.trim().length < 5
          ? "vendor must be at least 5 characters."
          : "",
      reason:
        formData.reason.trim().length < 5
          ? "reason must be at least 5 characters."
          : "",
    };
    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericRegex = /^(\d+(\.\d*)?|\.\d*)?$/;

    if (name === "amount") {
      if (numericRegex.test(value)) {
        const floatValue = value === "" ? "" : parseFloat(value);
        setFormData((prev) => ({
          ...prev,
          [name]: value === "" ? "" : floatValue.toString(),
        }));

        // Clear error if valid
        if (errors.amount) {
          setErrors((prev) => ({ ...prev, amount: "" }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          amount: "Please enter a valid number",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Validate the current field
    let errorMsg = "";
    switch (name) {
      case "source":
        errorMsg =
          value.length >= 4 ? "" : "Card number must be at least 4 digits.";
        break;
      case "amount":
        errorMsg = Number(value) > 0 ? "" : "Amount must be at least 1 rupee.";
        break;
      case "date":
        errorMsg = value.trim() !== "" ? "" : "Date is required.";
        break;
      case "vendor":
        errorMsg =
          value.trim().length >= 5
            ? ""
            : "Comments must be at least 5 characters.";
        break;
      case "reason":
        errorMsg =
          value.trim().length >= 5
            ? ""
            : "Comments must be at least 5 characters.";
        break;
    }

    // Update error state
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.source ||
      !formData.amount ||
      !formData.date ||
      !formData.vendor ||
      !formData.reason
    ) {
      validateForm();
      return;
    }

    setLoading(true); // Start loading

    try {
      await dispatch(addMnthInv(formData as Omit<MonthlyInvFormData, "id">));
      setFormData({ source: "", amount: "", date: "", vendor: "", reason: "" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const [suggestions] = useState<string[]>([
    "Axis Bank",
    "Central Bank",
    "State Bank",
  ]);

  return (
    <div className="page-container">
      <div className="card border border border-warning">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the Monthly Investment Dashboard — Real-time updates ahead!" />
        </div>
        <div className="card-body">
          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginBottom: "1rem",
              paddingTop: "0.5rem",
            }}
          >
            <h2 style={{ margin: 0 }}>📇 Add Monthly Investment Information</h2>
            <button
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "1rem",
              }}
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
              title="Back to Dashboard"
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              {errors.source && (
                <span className="error-text">{errors.source}</span>
              )}
              <input
                type="text"
                name="source"
                id="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Enter source.."
                className="form-input"
                list="relation-options"
              />
              <label htmlFor="name" className="fw-bold text-muted">Paid From:</label>
              <datalist id="relation-options">
                {suggestions.map((item, idx) => (
                  <option key={idx} value={item} />
                ))}
              </datalist>
              
            </div>

            <div className="form-group">
              {errors.amount && (
                <span className="error-text">{errors.amount}</span>
              )}
              <input
                type="number"
                step="any"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="form-input"
                autoComplete="off"
              />
              <label htmlFor="address" className="fw-bold text-muted">Amount:</label>
              
            </div>

            <div className="form-group" style={{ position: "relative" }}>
            {errors.date && <span className="error-text">{errors.date}</span>}
              <input
                type="date"
                name="date"
                ref={dateRef}
                id="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Enter Date"
                className="form-input"
                style={{ paddingRight: "2.5rem" }} // space for icon
                onClick={handleIconClick}
              />
              <label htmlFor="date" className="fw-bold text-muted">Date:</label>
              <CalendarDate
                size={30}
                onClick={handleIconClick}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "green",
                  fontWeight: "700",
                }}
              />

              
            </div>

            <div className="form-group">
              {errors.vendor && (
                <span className="error-text">{errors.vendor}</span>
              )}
              <input
                type="text"
                name="vendor"
                id="vendor"
                value={formData.vendor}
                onChange={handleChange}
                placeholder="Enter Comments where i place investment"
                className="form-input"
                autoComplete="off"
              />
              <label htmlFor="relation" className="fw-bold text-muted">Paid To:</label>
              
            </div>

            <div className="form-group">
              {errors.reason && (
                <span className="error-text">{errors.reason}</span>
              )}
              <input
                type="text"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason"
                className="form-input"
              />
              <label htmlFor="relation" className="fw-bold text-muted">Purpose :</label>
              
            </div>

            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Adding..." : "Add Monthly Investment"}
            </button>
            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
          </form>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default AddMonthlyInvForm;
