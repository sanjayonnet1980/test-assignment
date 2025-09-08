import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  deleteCreditCard,
  fetchCreditCard,
  updateCreditCard,
} from "../features/creditCard/creditCardSlice";
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

const ITEMS_PER_PAGE = 5;

const ViewCreditCardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { creditCard, loading, error } = useAppSelector(
    (state) => state.creditCard
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [blinkRowId, setBlinkRowId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    cardNumber: "",
    amount: "",
    date: "",
    comments: "",
  });

  useEffect(() => {
    dispatch(fetchCreditCard());
  }, [dispatch]);

  const totalPages = Math.ceil(creditCard.length / ITEMS_PER_PAGE);
  const paginatedData = creditCard.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (creditCard: any) => {
    setEditId(creditCard.id.toString());
    setEditForm({
      cardNumber: creditCard.cardNumber,
      amount: creditCard.amount,
      date: creditCard.date,
      comments: creditCard.comments,
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
      updateCreditCard({
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
      dispatch(deleteCreditCard(deleteTargetId));
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
          <h2 style={{ margin: 0 }}>📇 Credit Card Directory</h2>
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
          <table className="contact-table">
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Comments - Vendor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((creditcard) => (
                <tr
                  key={creditcard.id}
                  className={
                    blinkRowId === creditcard.id.toString() ? "blink-row" : ""
                  }
                >
                  {editId === creditcard.id.toString() ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="cardNumber"
                          value={editForm.cardNumber}
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
                          name="comments"
                          value={editForm.comments}
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
                      <td>{`XXXX-XXXX-XXXX-${creditcard.cardNumber}`}</td>
                      <td>₹ {parseFloat(creditcard.amount).toFixed(2)}</td>
                      <td>{formatDate(creditcard.date)}</td>
                      <td>{creditcard.comments}</td>
                      <td style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(creditcard)}
                        >
                          <PencilSquare />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(creditcard.id.toString())}
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
                <h5>Are you sure you want to delete this Credit Details?</h5>
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

export default ViewCreditCardPage;
