import React, { useState } from "react";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import Loader from "../atoms/Loader";

export interface SIPEntry {
  id: number;
  sipName: string;
  amount: number;
  folioNumber: number;
}

interface SIPPopupCardProps {
  isOpen: boolean;
  onClose: () => void;
  data: SIPEntry[];
  onEdit: (entry: SIPEntry) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

const SIPPopupCard: React.FC<SIPPopupCardProps> = ({
  isOpen,
  onClose,
  data,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<SIPEntry>>({});

  if (!isOpen) return null;

  const handleChange = (field: keyof SIPEntry, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (id: number) => {
    const updatedEntry: SIPEntry = {
      id,
      sipName: editValues.sipName as string,
      amount: Number(editValues.amount),
      folioNumber: Number(editValues.folioNumber),
    };
    onEdit(updatedEntry);
    setEditRowId(null);
    setEditValues({});
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.header}>
          <h2 style={styles.heading}>SIP Details</h2>
          <button style={styles.closeIcon} onClick={onClose}>
            ×
          </button>
        </div>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.th}>SrNo.</th>
              <th style={styles.th}>SIP Name</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Folio Number</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const isEditing = editRowId === entry.id;
              return (
                <tr key={entry.id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <input
                        type="text"
                        style={styles.input}
                        value={editValues.sipName ?? entry.sipName}
                        onChange={(e) =>
                          handleChange("sipName", e.target.value)
                        }
                        onFocus={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.border = "1px solid #3b82f6";
                        }}
                        onBlur={(e) => {
                          e.target.style.border = "none";
                        }}
                      />
                    ) : (
                      entry.sipName
                    )}
                  </td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <input
                        type="number"
                        style={styles.input}
                        value={editValues.amount ?? entry.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        onFocus={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.border = "1px solid #3b82f6";
                        }}
                        onBlur={(e) => {
                          e.target.style.border = "none";
                        }}
                      />
                    ) : (
                      entry.amount
                    )}
                  </td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <input
                        type="number"
                        style={styles.input}
                        value={editValues.folioNumber ?? entry.folioNumber}
                        onChange={(e) =>
                          handleChange("folioNumber", e.target.value)
                        }
                        onFocus={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.border = "1px solid #3b82f6";
                        }}
                        onBlur={(e) => {
                          e.target.style.border = "none";
                        }}
                      />
                    ) : (
                      entry.folioNumber
                    )}
                  </td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <>
                        <button
                          style={styles.iconBtn}
                          onClick={() => handleSave(entry.id)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#dc4584ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#10b981")
                          }
                          title="Save"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          style={styles.iconBtn}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#dc4584ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#10b981")
                          }
                          onClick={() => {
                            setEditRowId(null);
                            setEditValues({});
                          }}
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={styles.iconBtn}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#dc4584ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#10b981")
                          }
                          onClick={() => {
                            setEditRowId(entry.id);
                            setEditValues(entry);
                          }}
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          style={styles.iconBtn}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "#dc4584ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#10b981")
                          }
                          onClick={() => onDelete(entry.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <Loader overlay color="#10b981" size={48} />}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBtn: {
    marginRight: "8px",
    padding: "6px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
  },
  tableCell: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left",
    verticalAlign: "middle",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
    fontWeight: "600",
    color: "#374151",
  },

  tr: {
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    padding: "0.75rem",
    fontWeight: 600,
    color: "#374151",
    fontSize: "0.85rem",
    border: "1px solid #62748eff",
    textAlign: "center",
  },

  td: {
    boxSizing: "border-box",
    padding: "0.75rem",
    color: "#4b5563",
    fontSize: "1rem",
    border: "1px solid #62748eff",
    textAlign: "center",
    verticalAlign: "middle",
  },

  popup: {
    background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
    padding: "24px",
    borderRadius: "12px",
    width: "1000px",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#0f766e",
  },
  closeIcon: {
    position: "absolute",
    top: "16px",
    right: "16px",
    fontSize: "1.5rem",
    backgroundColor: "#fff",
    cursor: "pointer",
    color: "#ef4444",
    border: "2px solid red",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem",
  },
  tableRow: {
    backgroundColor: "#fff",
    transition: "background-color 0.2s ease",
  },
  tableRowHover: {
    backgroundColor: "#f3f4f6",
  },
  input: {
    width: "100%",
    height: "100%",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "0",
    border: "1px solid #817d7dff",
    fontSize: "0.95rem",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#8de4aaff",
    textAlign: "center",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  inputFocus: {
    borderColor: "#3b82f6",
  },
  editBtn: {
    marginRight: "8px",
    padding: "6px 12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

export default SIPPopupCard;
