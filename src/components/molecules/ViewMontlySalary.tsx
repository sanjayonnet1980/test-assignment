import React, { useState } from "react";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import { formatter } from "../../utils/formatterDate";

interface CreditTablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: CreditFormData[];
  rowsPerPage?: number;
  isLoading: boolean;
}

interface CreditFormData {
  month: string;
  creditamount: number;
  date: string;
  bankname: string;
}

const ViewMontlySalary: React.FC<CreditTablePopupProps> = ({
  isOpen,
  onClose,
  data,
  rowsPerPage = 10,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "green" }}>Monthly Salary Details</h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Serial</th>
              <th style={styles.th}>Month</th>
              <th style={styles.th}>Credit Amount</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Bank Name</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {paginatedData.map((entry, index) => (
              <tr
                key={index}
                style={{
                  ...styles.tr,
                  ...(index % 2 === 0 ? styles.trHover : {}),
                }}
              >
                <td style={styles.td}>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td style={styles.td}>{entry.month}</td>
                <td style={styles.td}>₹{entry.creditamount}</td>
                <td style={styles.td}>
                  {formatter.format(new Date(entry.date))}
                </td>
                <td style={styles.td}>{entry.bankname}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <Button
            label="Prev"
            onClick={handlePrev}
            disabled={currentPage === 1}
            classname={""}
          />
          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            label="Next"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            classname={""}
          />
        </div>
      </div>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "900px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
    padding: "10%",
  },
  th: {
    padding: "1rem",
    fontWeight: 700,
    color: "#374151",
    fontSize: "1rem",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },
  pageInfo: {
    fontWeight: "bold",
    color: "#555",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
};

export default ViewMontlySalary;
