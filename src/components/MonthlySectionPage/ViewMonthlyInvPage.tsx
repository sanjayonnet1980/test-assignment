import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchMnthInv,
  updateMnthInv,
  deleteMnthInv,
} from "../../features/MonthlyInv/monthlyInvSlice";
import HeaderSection from "../../atoms/HeaderSection";
import SearchBar from "../../atoms/SearchBar";
import MonthlyInvTable from "./MonthlyInvTable";
import PaginationControls from "../../atoms/PaginationControls";
import ConfirmButton from "../../atoms/ConfirmationButton";
import CancelButton from "../../atoms/CancelButton";

const ITEMS_PER_PAGE = 5;

const ViewMonthlyInvPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { monthlyInvestment, loading, error } = useAppSelector(
    (state) => state.monthlyInv
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    source: "",
    amount: "",
    date: "",
    vendor: "",
    reason: "",
  });
  const [blinkRowId, setBlinkRowId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    dispatch(fetchMnthInv());
  }, [dispatch]);

  const filteredData = monthlyInvestment.filter((inv) =>
    Object.values(inv)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditClick = (inv: any) => {
    setEditId(inv.id.toString());
    setEditForm({
      source: inv.source,
      amount: inv.amount,
      date: inv.date,
      vendor: inv.vendor,
      reason: inv.reason,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const floatRegex = /^(\d+(\.\d{0,2})?)?$/;
      if (floatRegex.test(value)) {
        setEditForm((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = () => {
    if (!editId) return;
    dispatch(updateMnthInv({ id: editId, ...editForm }));
    setEditId(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleDeleteClick = (id: string) => {
    setBlinkRowId(id);
    setDeleteTargetId(id);
    setShowDeleteModal(true);
    setTimeout(() => setBlinkRowId(null), 9000);
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

  return (
    <div className="page-container">
      <div className="card">
        <HeaderSection text={"Monthly Investment Directory"}/>
        <div className="card-body">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {loading && <div className="loader">Loading investments...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <>
              <MonthlyInvTable
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
            </>
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
        </div>
      </div>
    </div>
  );
};

export default ViewMonthlyInvPage;
