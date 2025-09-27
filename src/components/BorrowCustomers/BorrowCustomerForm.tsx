import React, { useEffect, useState } from "react";
import SlidingHeaderText from "../../atoms/SlidingText";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  borrowCustomersPost,
  resetStatus,
} from "../../features/BorrowCustomers/borrowCustomers";
import BorrowCustomersRow from "./BorrowCustomersRow";
import ViewBorrowCustomersTable from "./ViewBorrowCustomersTable";

const BorrowCustomer = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.viewAddBorrowCutomer
  );
  const [refreshTable, setRefreshTable] = useState(false);
  const [rows, setRows] = useState([
    {
      customeName: "",
      quantityKg: "",
      pricePerKg: "",
      purchaseDate: "",
      customerAddress: "",
      mobileNumber: "",
    },
  ]);

  const navigate = useNavigate();
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
      {
        customeName: "",
        quantityKg: "",
        pricePerKg: "",
        purchaseDate: "",
        customerAddress: "",
        mobileNumber: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const promises = rows.map((row) =>
      dispatch(
        borrowCustomersPost({
          customeName: row.customeName,
          quantityKg: Number(row.quantityKg),
          pricePerKg: Number(row.pricePerKg),
          purchaseDate: row.purchaseDate,
          customerAddress: row.customerAddress,
          mobileNumber: row.mobileNumber,
        })
      )
    );
    await Promise.all(promises); // ✅ Wait for all submissions

    setRefreshTable((prev) => !prev);
    setRows([
      {
        customeName: "",
        quantityKg: "",
        pricePerKg: "",
        purchaseDate: "",
        customerAddress: "",
        mobileNumber: "",
      },
    ]);
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
          <SlidingHeaderText text="🚀 Welcome to the Borrow Customers Dashboard — Real-time updates ahead!" />
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
            <h2 style={{ margin: 0 }}>
              📇 Add and View Borrow Customer Details
            </h2>
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
              <BorrowCustomersRow
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
              {loading ? "Submitting..." : "Submit Borrow Details"}
            </button>

            {loading && (
              <div className="loader-overlay">
                <div className="loader-circle"></div>
              </div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
        <ViewBorrowCustomersTable refreshTrigger={refreshTable} />
      </div>
    </div>
  );
};

export default BorrowCustomer;
