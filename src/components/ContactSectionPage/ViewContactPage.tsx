import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteContact,
  fetchContacts,
  updateContact,
} from "../../features/contact/contactSlice";

import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import SlidingHeaderText from "../../atoms/SlidingText";
import ConfirmButton from "../../atoms/ConfirmationButton";
import CancelButton from "../../atoms/CancelButton";
import ContactEditRow from "./ContactEditRow";
import ContactReadOnlyRow from "./ContactReadOnlyRow";
import PaginationControls from "../../atoms/PaginationControls";
import SearchBar from "../../atoms/SearchBar";

const ITEMS_PER_PAGE = 5;

const ViewContactList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [blinkRowId, setBlinkRowId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { contactDetails, loading, error } = useAppSelector(
    (state) => state.contact
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredData = contactDetails
    .filter((contact) =>
      Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditClick = (contact: any) => {
    setEditId(contact.id.toString());
    setEditForm({
      name: contact.name,
      address: contact.address,
      phone: contact.phone,
      relation: contact.relation,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    if (!editId) return;
    dispatch(
      updateContact({
        id: editId,
        ...editForm,
      })
    );
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
      dispatch(deleteContact(deleteTargetId));
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

  if (loading) return <div className="loader">Loading contacts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page-container">
      <div className="card border border border-warning">
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
          <h2 style={{ margin: 0 }}>📇 Contact Directory</h2>
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

        <div className="card-body">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {loading && <div className="loader">Loading investments...</div>}
          {error && <div className="error">Error: {error}</div>}
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Relation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((contact) => (
                <tr
                  key={contact.id}
                  className={
                    blinkRowId === contact.id.toString() ? "blink-row" : ""
                  }
                >
                  {editId === contact.id.toString() ? (
                    <ContactEditRow
                      editForm={editForm}
                      onChange={handleEditChange}
                      onSave={handleEditSave}
                      onCancel={() => setEditId(null)}
                    />
                  ) : (
                    <ContactReadOnlyRow
                      contact={contact}
                      onEdit={handleEditClick}
                      onDelete={handleDelete}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
        <div className="card-footer text-primary">
          Your contact details are securely stored · Need help? Reach out to
          support
        </div>
      </div>
    </div>
  );
};

export default ViewContactList;
