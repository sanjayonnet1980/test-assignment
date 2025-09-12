import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteCreditCard,
  fetchCreditCard,
  updateCreditCard,
} from "../../features/creditCard/creditCardSlice";
import ConfirmButton from "../../atoms/ConfirmationButton";
import CancelButton from "../../atoms/CancelButton";
import HeaderSection from "../../atoms/HeaderSection";
import SearchBar from "../../atoms/SearchBar";
import CreditCardTable from "./CreditCardTable";
import PaginationControls from "../../atoms/PaginationControls";
import { calculateCreditCardTotalsByCard } from "../../utils/creditCardTotal";
import { formatToINRCurrency } from "../../utils/amountFormat";
import { FileEarmarkArrowDown, ArrowRight } from "react-bootstrap-icons";
import { handleDownloadPDF } from "../../utils/pdfExportCreditCard";

const ITEMS_PER_PAGE = 5;

const ViewCreditCardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { creditCard, loading, error } = useAppSelector(
    (state) => state.creditCard
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [blinkRowId, setBlinkRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    cardNumber: "",
    amount: "",
    date: "",
    comments: "",
    mode: "",
  });

  useEffect(() => {
    dispatch(fetchCreditCard());
  }, [dispatch]);

  const filteredData = creditCard
    .filter((creditCard) =>
      Object.values(creditCard)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handleEditClick = (creditCard: any) => {
    setEditId(creditCard.id.toString());
    setEditForm({
      cardNumber: creditCard.cardNumber,
      amount: creditCard.amount,
      date: creditCard.date,
      comments: creditCard.comments,
      mode: creditCard.mode,
    });
  };

  const onDownloadClick = () => {
    handleDownloadPDF(filteredData);
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

  const handleDeleteClick = (id: string) => {
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

  if (loading) return <div className="loader">Loading credit card...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const cardTotals = calculateCreditCardTotalsByCard(creditCard);
  return (
    <div className="page-container">
      <div className="card border border border-warning">
        <HeaderSection text={"Credit Card Investment Directory"} />
        <div className="card-body">
          <button
            className="btn btn-outline-primary"
            onClick={onDownloadClick}
            title="Download Credit Card details into PDF"
          >
            <FileEarmarkArrowDown size={20} />
          </button>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {loading && <div className="loader">Loading investments...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <div className="border">
              <CreditCardTable
                data={paginatedData}
                editId={editId}
                editForm={editForm}
                blinkRowId={blinkRowId}
                onEditClick={handleEditClick}
                onEditChange={handleEditChange}
                onEditSave={handleEditSave}
                onEditCancel={handleEditCancel}
                onDeleteClick={handleDeleteClick}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
          {showDeleteModal && (
            <div className="modal-box-centered">
              <h5>Are you sure you want to delete this Credit Details?</h5>
              <div className="modal-actions">
                <ConfirmButton onClick={confirmDelete} />
                <CancelButton onClick={cancelDelete} />
              </div>
            </div>
          )}
          <div className="card-footer border shadow-sm p-3">
            {Object.entries(cardTotals).map(([cardNumber, totals]) => (
              <div
                key={cardNumber}
                className="card-summary d-flex gap-3 justify-content-center"
              >
                <p className="text-primary fw-bold">Card: {cardNumber} {" "}<ArrowRight size={20} /></p>
                <p className="text-primary fw-bold">
                 💰 Cashback: {formatToINRCurrency(totals.cashbackTotal)}{" "}<ArrowRight size={20} />
                </p>
                <p className="text-primary fw-bold">
                  📈 Investment: {formatToINRCurrency(totals.investmentTotal)}{" "}<ArrowRight size={20} />
                </p>
                <p className="text-primary fw-bold">
                  🧾 Billing: {formatToINRCurrency(totals.billingTotal)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCreditCardPage;
