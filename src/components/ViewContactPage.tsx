import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  deleteContact,
  fetchContacts,
  updateContact,
} from "../features/contact/contactSlice";
import { PencilSquare, Trash, Check2, X } from "react-bootstrap-icons";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import SlidingHeaderText from "../atoms/SlidingText";

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
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    phone: "",
    relation: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const totalPages = Math.ceil(contactDetails.length / ITEMS_PER_PAGE);
  const paginatedData = contactDetails.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <h2 style={{ margin: 0 }}>📇 Contact Directory</h2>
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
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          value={editForm.address}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="relation"
                          value={editForm.relation}
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
                      <td>{contact.name}</td>
                      <td>{contact.address}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.relation}</td>
                      <td style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(contact)}
                        >
                          <PencilSquare />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(contact.id.toString())}
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
          </div>
          {showDeleteModal && (
            <div className="modal-box-centered">
              <h5>Are you sure you want to delete this contact?</h5>
              <div className="modal-actions">
                <button className="btn btn-danger me-2" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  );
};

export default ViewContactList;
