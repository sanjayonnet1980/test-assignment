import React, { useState } from "react";
import "./PopupCard.css";
import Loader from "../atoms/Loader";
import { Edit, Trash2, Save, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { fetchPut } from "../../utils/fetchPut";

interface Contact {
  srno: number;
  name: string;
  phone: string;
  address: string;
  relationship: string;
}

interface PopupCardProps {
  data: Contact[];
  isOpen: boolean;
  onClose: () => void;
  pageSize?: number;
  isLoading: boolean;
  refreshData: () => void;
}

const ViewContact: React.FC<PopupCardProps> = ({
  data,
  isOpen,
  onClose,
  pageSize = 8,
  isLoading,
  refreshData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data && Math.ceil(data.length / pageSize);
  const paginatedData =
    data && data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Contact>({
    srno: 0,
    name: "",
    address: "",
    phone: "",
    relationship: "",
  });

  if (!isOpen) return null;
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycby11-gNTc2fNaVRtsICZ3oEGgAybwCNqnj9cEBxpVecBr-5rn-53BG4S7jVJQra6yvr/exec";

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditData({ ...paginatedData[index] });
  };

  const handleInputChange = (field: keyof Contact, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const deleteRow = async (serial: number) => {
    refreshData();
    const formattedData = new URLSearchParams({
      mode: "delete",
      srno: serial.toString(),
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxzPnzTm6LYRDvl4cS6SLxHyziOrCOuwxhJ--RLywwaJMAtf1J5XfuRA3PL5vzBuJY/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formattedData.toString(),
        }
      );
      refreshData();
      const result = await response.json();

      if (result.success) {
        toast.success("Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.error(`❌ Delete failed: ${result.message}`);
      }
    } catch (error) {
      console.error("⚠️ Network error during delete:", error);
    }
  };

  const handleSave = async () => {
    if (editIndex !== null) {
      const updated = [...paginatedData];
      updated[editIndex] = editData;

      fetchPut(scriptUrl, editData).then((response: any) => {
        if (response) {
          toast.success("✅ Contact updated via PUT!");
        } else {
          toast.error("❌ PUT update failed.");
        }
      });

      setEditIndex(null);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <header className="popup-header">
          <h2>Contact Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </header>

        <table className="popup-table">
          <thead>
            <tr>
              <th>SrNo.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Relationship</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData &&
              paginatedData.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.srno}</td>

                  {editIndex === index ? (
                    <>
                      <td>
                        <input
                          value={editData.name}
                          className="editable-input"
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editData.address}
                          className="editable-input"
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editData.phone}
                          className="editable-input"
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editData.relationship}
                          className="editable-input"
                          onChange={(e) =>
                            handleInputChange("relationship", e.target.value)
                          }
                        />
                      </td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="tooltip"
                          data-tooltip="Save changes"
                          onClick={handleSave}
                        >
                          <Save size={20} color="#28a745" />
                        </button>
                        <button
                          className="tooltip"
                          data-tooltip="Cancel operation"
                          onClick={() => setEditIndex(null)}
                        >
                          <XCircle size={20} color="#dc3545" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{contact.name}</td>
                      <td>{contact.address}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.relationship}</td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="icon-button edit tooltip"
                          data-tooltip="Edit Operation"
                          onClick={() => handleEditClick(index)}
                        >
                          <Edit size={20} color="#007bff" />
                        </button>
                        <button
                          className="icon-button delete tooltip"
                          data-tooltip="Delete Operation"
                          onClick={() => deleteRow(contact.srno)}
                        >
                          <Trash2 size={20} color="#dc3545" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
          {paginatedData.length < 1 && (
            <div
              style={{
                fontWeight: "700",
                fontSize: "20px",
                color: "red",
                marginTop: "20px",
              }}
            >
              No Data found please add contact details..
            </div>
          )}
        </table>

        <footer className="pagination-controls">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </footer>
      </div>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </div>
  );
};

export default ViewContact;
