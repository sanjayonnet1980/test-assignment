import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addWheatPurchase,
  resetStatus,
} from "../../features/WheatItems/wheatSlice";
import WheatRow from "./WheatRow";
import AddRemoveButtons from "./AddRemoveButtons";
import SlidingHeaderText from "../../atoms/SlidingText";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const BuyWheatForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.buyWheat);

  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { buyerName: "", quantityKg: "", pricePerKg: "", purchaseDate: "" },
  ]);

  const handleRowChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...rows];
    updated[index][e.target.name as keyof (typeof updated)[0]] = e.target.value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { buyerName: "", quantityKg: "", pricePerKg: "", purchaseDate: "" },
    ]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rows.forEach((row) => {
      dispatch(
        addWheatPurchase({
          buyerName: row.buyerName,
          quantityKg: Number(row.quantityKg),
          pricePerKg: Number(row.pricePerKg),
          purchaseDate: row.purchaseDate,
        })
      );
    });
    setRows([{ buyerName: "", quantityKg: "", pricePerKg: "", purchaseDate: "" }])
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

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
            <h2 style={{ margin: 0 }}>📇 Add Wheat Purchase Products</h2>
            <button
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "1rem",
              }}
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard")}
              title="Back to Dashboard"
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="contact-form p-4">
            {rows.map((row, index) => (
              <WheatRow
                key={index}
                index={index}
                data={row}
                onChange={handleRowChange}
                onRemove={removeRow}
                canRemove={rows.length > 1}
              />
            ))}

            <AddRemoveButtons onAdd={addRow} />

            <button
              type="submit"
              className="form-button w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit All Purchases"}
            </button>

            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyWheatForm;
