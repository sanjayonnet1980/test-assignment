import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import SlidingHeaderText from "../atoms/SlidingText";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Check2,
  PencilSquare,
  Trash,
  X,
} from "react-bootstrap-icons";
import ConfirmButton from "../atoms/ConfirmationButton";
import CancelButton from "../atoms/CancelButton";
import { deleteMnthInv, fetchMnthInv, updateMnthInv } from "../features/MonthlyInv/monthlyInvSlice";

const ITEMS_PER_PAGE = 5;

const ViewMonthlyInvPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { monthlyInvestment, loading, error } = useAppSelector(
    (state) => state.monthlyInv
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [blinkRowId, setBlinkRowId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    source: "",
    amount: "",
    date: "",
    vendor: "",
    reason: ""
  });

  useEffect(() => {
    dispatch(fetchMnthInv());
  }, [dispatch]);

  const filteredData = monthlyInvestment.filter((monthlyInv) =>
    Object.values(monthlyInv)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (monthlyInvestment: any) => {
    setEditId(monthlyInvestment.id.toString());
    setEditForm({
      source: monthlyInvestment.source,
      amount: monthlyInvestment.amount,
      date: monthlyInvestment.date,
      vendor: monthlyInvestment.vendor,
      reason: monthlyInvestment.reason
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const floatRegex = /^(\d+(\.\d{0,2})?)?$/;
      if (floatRegex.test(value)) {
        setEditForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSave = () => {
    if (!editId) return;
    dispatch(
      updateMnthInv({
        id: editId,
        ...editForm,
      })
    );
    setEditId(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    setBlinkRowId(id);
    setDeleteTargetId(id);
    setShowDeleteModal(true);

    // Remove blink after animation duration
    setTimeout(() => {
      setBlinkRowId(null);
    }, 9000); // match CSS animation duration
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteMnthInv(deleteTargetId));
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      setBlinkRowId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
    setBlinkRowId(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (loading) return <div className="loader">Loading credit card...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <SlidingHeaderText text="🚀 Welcome to the Investment Dashboard — Real-time updates ahead!" />
        </div>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            marginBottom: "1rem",
            paddingTop: "0.5rem",
          }}
        >
          <h2 style={{ margin: 0 }}>📇 Monthly Investment Directory</h2>
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
        <div className="card-body">
          <div className="search-bar mb-3 d-flex justify-content-end align-items-center">
            <input
              type="text"
              className="form-control me-2"
              placeholder="🔍 Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              Clear
            </button>
          </div>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Paid From</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Paid to</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((monthlyinv) => (
                <tr
                  key={monthlyinv.id}
                  className={
                    blinkRowId === monthlyinv.id.toString() ? "blink-row" : ""
                  }
                >
                  {editId === monthlyinv.id.toString() ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="source"
                          value={editForm.source}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <div className="input-with-icon">
                          <span className="rupee-icon">₹</span>
                          <input
                            type="text"
                            name="amount"
                            value={editForm.amount}
                            onChange={handleEditChange}
                            onBlur={() =>
                              setEditForm((prev) => ({
                                ...prev,
                                amount: prev.amount
                                  ? parseFloat(prev.amount).toFixed(2)
                                  : "",
                              }))
                            }
                            className="form-control"
                          />
                        </div>
                      </td>

                      <td>
                        <input
                          type="text"
                          name="date"
                          value={editForm.date}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="vendor"
                          value={editForm.vendor}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="reason"
                          value={editForm.reason}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={handleEditSave}
                        >
                          <Check2 />
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={handleEditCancel}
                        >
                          <X />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{monthlyinv.source}</td>
                      <td>₹ {parseFloat(monthlyinv.amount).toFixed(2)}</td>
                      <td>{formatDate(monthlyinv.date)}</td>
                      <td>{monthlyinv.vendor}</td>
                      <td>{monthlyinv.reason}</td>
                      <td style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(monthlyinv)}
                        >
                          <PencilSquare />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(monthlyinv.id.toString())}
                        >
                          <Trash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination mt-3">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  className={`btn btn-sm me-1 ${
                    isActive ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isActive}
                >
                  {pageNum}
                </button>
              );
            })}
            {showDeleteModal && (
              <div className="modal-box-centered">
                <h5>Are you sure you want to delete this Monthly Investment Records?</h5>
                <div className="modal-actions">
                  <ConfirmButton onClick={confirmDelete} />
                  <CancelButton onClick={cancelDelete} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default ViewMonthlyInvPage;
