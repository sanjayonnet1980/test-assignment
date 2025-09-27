import React, { useEffect, useState } from "react";
import SellProductForm from "./SellProductForm";
import SellProductRow from "./SellProductRow";
import { SellEntry } from "../../types/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  deleteSellProduct,
  fetchDailyProducts,
} from "../../features/WheatItems/sellDailyProductLSlice";
import SellProductRowCustomer from "./SellProductRowCustomer";
import { ArrowLeftCircle, Alarm } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import PopupCard from "./PopupCard";
import AtomButton from "../../atoms/AtomButton";

const SellProductTable: React.FC = () => {
  const [entries, setEntries] = useState<SellEntry[]>([]);
  const [customerEntries, setCustomerEntries] = useState<SellEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Fetch entries on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchDailyProducts()).unwrap();
        setEntries(result);

        // ✅ Restore customerEntries from localStorage
        const stored = localStorage.getItem("customerEntries");
        if (stored) {
          const parsed = JSON.parse(stored) as SellEntry[];
          setCustomerEntries(parsed);
        } else {
          setCustomerEntries(result); // fallback to full list
        }
      } catch (err: any) {
        setError(typeof err === "string" ? err : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleAdd = (entry: SellEntry) => {
    setEntries((prev) => [...prev, entry]);
    setCustomerEntries((prev) => [...prev, entry]);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSellProduct(id));
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomerEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const totalCost = entries.reduce((sum, entry) => {
    return sum + entry.quantityKg * entry.pricePerKg;
  }, 0);

  const totalCostToday = customerEntries.reduce((sum, entry) => {
    return sum + entry.quantityKg * entry.pricePerKg;
  }, 0);

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setCustomerEntries([]);
    setShowConfirm(false);
  };

  useEffect(() => {
    localStorage.setItem("customerEntries", JSON.stringify(customerEntries));
  }, [customerEntries]);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "2rem auto",
        padding: "1rem",
        boxShadow: "0 0 10px #ccc",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: '50px'
        }}
      >
        <h2>Daily Product Sales</h2>

        <AtomButton
          label="Reset Each Selling Customer"
          className="btn btn-outline-success"
          onClick={() => {
            setShowConfirm(true);
          }}
          icon={<Alarm size={20} />}
          disabled={false}
        />

        <AtomButton
          icon={<ArrowLeftCircle size={24} />}
          title="Back to Dashboard"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/business")}
          label=""
          disabled={false}
        />
      </div>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <SellProductForm onAdd={handleAdd} />

      <h5 className="text-success fw-bold">Customer Selling reports</h5>
      <div className="d-flex justify-content-end fw-bold fs-5 text-danger">
        Total ₹ {totalCostToday.toFixed(2)}
      </div>
      <table className="w-100 border">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity (Kg)</th>
            <th>Price/Kg (₹)</th>
            <th>Total (₹)</th>
            <th>Date</th>
            <th>Mode of Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerEntries.map((entry) => (
            <SellProductRowCustomer
              key={entry.id}
              entry={entry}
              onDelete={() => handleDeleteCustomer(entry.id)}
            />
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <h5 className="text-success fw-bold">Today Actual Selling reports</h5>
      <div className="d-flex justify-content-end">
        Total ₹ {totalCost.toFixed(2)}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity (Kg)</th>
            <th>Price/Kg (₹)</th>
            <th>Total (₹)</th>
            <th>Date</th>
            <th>Time</th>
            <th>Mode of Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...entries]
            .filter((entry) => {
              const today = new Date().toISOString().slice(0, 10);
              return entry.date === today;
            })
            .map((entry) => (
              <SellProductRow
                key={entry.id}
                entry={entry}
                onDelete={() => handleDelete(entry.id)}
              />
            ))}
        </tbody>
        {showConfirm && (
          <PopupCard onCancel={handleCancel} onConfirm={handleConfirm} />
        )}
      </table>
    </div>
  );
};

export default SellProductTable;
