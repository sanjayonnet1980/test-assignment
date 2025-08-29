import React, { useState } from "react";
import Loader from "../atoms/Loader";
import { IndianRupee, Hand, ArrowUpRight } from "lucide-react";

type TableRow = {
  reason: string;
  amount: number;
  date: string;
};

type PaginatedTableProps = {
  data: TableRow[];
  rowsPerPage?: number;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
};

const ViewSalary: React.FC<PaginatedTableProps> = ({
  data,
  isOpen,
  onClose,
  isLoading,
  rowsPerPage = 8,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (!isOpen) return null;

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const totalAmount = data.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "green" }}>
            Salary Investment Details
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={{ padding: "1rem", position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginBottom: "0.75rem",
              fontWeight: 700,
              color: "#053f90ff",
              fontSize: "1.20rem",
            }}
          >
            Total Amount: ₹{totalAmount.toLocaleString("en-IN")}
          </div>

          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Sr No</th>
                <th style={styles.th}>Details</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {currentRows.map((row, index) => (
                <tr
                  key={startIndex + index}
                  style={{
                    ...styles.tr,
                    ...(index % 2 === 0 ? styles.trHover : {}),
                  }}
                >
                  <td style={styles.td}>{startIndex + index + 1}</td>
                  <td style={styles.td}>
                    <Hand size={15} />
                    {row.reason}
                    <ArrowUpRight size={18} />
                  </td>
                  <td style={styles.td}>
                    <IndianRupee size={13} />
                    {row.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={styles.td}>
                    {formatter.format(new Date(row.date))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading && <Loader overlay color="#10b981" size={48} />}
        </div>

        <div style={styles.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "900px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    overflow: "hidden",
    animation: "fadeIn 0.3s ease-in-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  closeButton: {
    backgroundColor: "#fff",
    border: "2px solid red",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "red",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "0.95rem",
    backgroundColor: "#fff",
    overflowX: "auto" as const,
    border: "1px solid #7b7d82ff",
  },
  thead: {
    backgroundColor: "#f3f4f6",
    textAlign: "left" as const,
    borderBottom: "2px solid #e5e7eb",
  },
  th: {
    padding: "0.75rem",
    fontWeight: 600,
    color: "#374151",
    fontSize: "0.85rem",
  },
  tbody: {
    backgroundColor: "#fff",
  },
  tr: {
    borderBottom: "1px solid #e5e7eb",
    transition: "background-color 0.2s ease-in-out",
  },
  td: {
    padding: "0.75rem",
    color: "#4b5563",
    fontSize: "0.95rem",
  },
  trHover: {
    backgroundColor: "#f9fafb",
  },

  pagination: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
};

export default ViewSalary;
