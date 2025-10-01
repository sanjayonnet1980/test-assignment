import React, { useEffect, useState } from "react";
import SlidingHeaderText from "../../atoms/SlidingText";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import StocksRow from "./StocksRow";
import { resetStatus, stockDataPost, Stocks } from "../../features/Stocks/stockSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ViewStockTable from "./ViewStockTable";

const StockDetailsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [refreshTable, setRefreshTable] = useState(false);
  const { loading, error, success } = useAppSelector(
    (state) => state.viewAddStock
  );
  const [rows, setRows] = useState([
    {
      clientName: "",
      quantityKg: 0,
      pricePerKg: 0,
      purchaseDate: "",
      productName: "",
      clientMno: "",
    },
  ]);
  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };
  const handleRowChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const key = e.target.name as keyof Stocks;
    const value = e.target.value;

    const updated = [...rows]; // assuming stocks is your state
    updated[index] = {
      ...updated[index],
      [key]:
        key === "quantityKg" || key === "pricePerKg" ? Number(value) : value,
    };

    setRows(updated);
  };
  const addRow = () => {
    setRows([
      ...rows,
      {
        clientName: "",
        quantityKg: 0,
        pricePerKg: 0,
        purchaseDate: "",
        productName: "",
        clientMno: "",
      },
    ]);
  };
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        const promises = rows.map((row) =>
          dispatch(
            stockDataPost({
              clientName: row.clientName,
              quantityKg: Number(row.quantityKg),
              pricePerKg: Number(row.pricePerKg),
              purchaseDate: row.purchaseDate,
              productName: row.productName,
              clientMno: row.clientMno,
            })
          )
        );
        await Promise.all(promises); // ✅ Wait for all submissions
    
        setRefreshTable((prev) => !prev);
        setRows([
          {
            clientName: "",
            quantityKg: 0,
            pricePerKg: 0,
            purchaseDate: "",
            productName: "",
            clientMno: "",
          },
        ]);
  };
  return (
    <div className="page-container">
      <div className="card border border border-warning">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the Stocks Dashboard — Real-time updates ahead!" />
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
            <h2 style={{ margin: 0 }}>📇 Add and View Stocks Details</h2>
            <button
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "1rem",
              }}
              className="btn btn-outline-secondary"
              onClick={() => navigate("/business")}
              title="Back to Dashboard"
            >
              <ArrowLeftCircle size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="contact-form p-4">
            {rows.map((row, index) => (
              <StocksRow
                key={index}
                index={index}
                data={row}
                onChange={handleRowChange}
                onRemove={removeRow}
                canRemove={rows.length > 1}
                onAdd={addRow}
                addMore={rows.length - 1 === index}
              />
            ))}
            <button
              type="submit"
              className="form-button w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Stock Details"}
            </button>

            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
        <ViewStockTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default StockDetailsForm;
