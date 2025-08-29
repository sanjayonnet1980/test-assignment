import React, { useState } from "react";

type TransactionRow = {
  name: string;
  amount: number;
  date: string;
  vendor: string;
  cardno: string;
};

type TransactionPopupCardProps = {
  data: TransactionRow[];
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  rowsPerPage?: number;
};

const ViewCreditInv: React.FC<TransactionPopupCardProps> = ({
  data,
  isOpen,
  onClose,
  isLoading,
  rowsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =data && Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows =data && data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!isOpen) return null;

  const totalAmount = data.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "green" }}>
            Credit Card Inv. Transaction Details
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            ×
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
                <th style={styles.th}>Serial</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Vendor</th>
                <th style={styles.th}>Card No</th>
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {currentRows && currentRows.map((row, index) => (
                <tr key={startIndex + index} style={styles.tr}>
                  <td style={styles.td}>{startIndex + index + 1}</td>
                  <td style={styles.td}>{row.name}</td>
                  <td style={styles.td}>
                    ₹{row.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={styles.td}>
                    {formatter.format(new Date(row.date))}
                  </td>
                  <td style={styles.td}>{row.vendor}</td>
                  <td style={styles.cardno}>{row.cardno}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading && (
            <div style={styles.loaderOverlay}>
              <div style={styles.loader} />
            </div>
          )}
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
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "red",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "1.55rem",
    backgroundColor: "#fff",
    border: "1px solid #d1d5db",
  },
  thead: {
    backgroundColor: "#f3f4f6",
    textAlign: "left" as const,
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
  },
  td: {
    padding: "0.75rem",
    color: "#4b5563",
    fontSize: "1rem",
  },
  cardno: {
    padding: "0.75rem",
    color: "#ee1b54ff",
    fontSize: "1rem",
    fontWeight: 'bold'
  },
  pagination: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  loaderOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: "32px",
    height: "32px",
    border: "4px solid #ccc",
    borderTopColor: "#10b981",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

export default ViewCreditInv;
