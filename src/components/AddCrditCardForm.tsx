import { useRef, useState } from "react";
import { useAppDispatch } from "../hooks";
import { Omit } from "utility-types";
import SlidingHeaderText from "../atoms/SlidingText";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "../types/creditCardTypes";
import { addCreditCard } from "../features/creditCard/creditCardSlice";
import { CalendarDate } from "react-bootstrap-icons";

type CreditCardFormData = Omit<CreditCard, "id">;

const AddCreditCardForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    cardNumber: "",
    amount: "",
    date: "",
    comments: "",
  });
  const dateRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    // Trigger native date picker
    dateRef.current?.showPicker?.() || dateRef.current?.focus();
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<CreditCardFormData, "id">>({
    cardNumber: "",
    amount: "",
    date: "",
    comments: "",
  });

  const [suggestions] = useState<string[]>(["4188", "5549", "7577"]);
  const validateForm = () => {
    const newErrors = {
      cardNumber:
        formData.cardNumber.trim().length < 4
          ? "cardNumber must be at least Last 4 characters."
          : "",
      amount:
        Number(formData.amount.trim()) >= 0
          ? "Amount must be at least 1 rupees."
          : "",
      date: formData.date.trim() === "" ? "required date." : "",
      comments:
        formData.comments.trim().length > 5
          ? "comments must be at least 5 characters."
          : "",
    };
    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericRegex = /^(\d+(\.\d*)?|\.\d*)?$/;

    // Sanitize numeric fields
    const sanitizedValue =
      name === "cardNumber" ? value.replace(/\D/g, "") : value;
      
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
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    }

    // Validate the current field
    let errorMsg = "";
    switch (name) {
      case "cardNumber":
        errorMsg =
          sanitizedValue.length >= 4
            ? ""
            : "Card number must be at least 4 digits.";
        break;
      case "amount":
        errorMsg =
          Number(sanitizedValue) > 0 ? "" : "Amount must be at least 1 rupee.";
        break;
      case "date":
        errorMsg = sanitizedValue.trim() !== "" ? "" : "Date is required.";
        break;
      case "comments":
        errorMsg =
          sanitizedValue.trim().length >= 5
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
      !formData.cardNumber ||
      !formData.amount ||
      !formData.date ||
      !formData.comments
    ) {
      validateForm();
      return;
    }

    setLoading(true); // Start loading

    try {
      await dispatch(addCreditCard(formData as Omit<CreditCardFormData, "id">));
      setFormData({ cardNumber: "", amount: "", date: "", comments: "" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
              paddingTop: "0.5rem",
            }}
          >
            <h2 style={{ margin: 0 }}>📇 Add Credit Card Information</h2>
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
              <label htmlFor="name">Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter 4 digit card number"
                className="form-input"
                list="relation-options"
                pattern="\d{4}"
                maxLength={4}
                inputMode="numeric"
              />
              <datalist id="relation-options">
                {suggestions.map((item, idx) => (
                  <option key={idx} value={item} />
                ))}
              </datalist>
              {errors.cardNumber && (
                <span className="error-text">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Amount:</label>
              <input
                type="number"
                step="any"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="form-input"
              />
              {errors.amount && (
                <span className="error-text">{errors.amount}</span>
              )}
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="date">Date:</label>
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
              <CalendarDate
                size={30}
                onClick={handleIconClick}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "green",
                  fontWeight: "700",
                }}
              />

              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="relation">Comments:</label>
              <input
                type="text"
                name="comments"
                id="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Enter Comments where i place investment"
                className="form-input"
              />
              {errors.comments && (
                <span className="error-text">{errors.comments}</span>
              )}
            </div>

            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Adding..." : "Add Contact"}
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

export default AddCreditCardForm;
