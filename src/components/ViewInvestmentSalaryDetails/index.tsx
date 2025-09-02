// index.tsx
import React, { useState } from "react";
import Header from "./Header";
import Table from "./Table";
import Pagination from "./Pagination";
import Loader from "../atoms/Loader";
import { styles } from "./styles";
import { PaginatedTableProps } from "./types";

const ViewInvestmentSalaryDetails: React.FC<PaginatedTableProps> = ({
  data,
  isOpen,
  onClose,
  isLoading,
  rowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);
  const totalAmount = data.reduce((sum, row) => sum + row.amount, 0);

  if (!isOpen) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <Header onClose={onClose} />

        <div style={{ padding: "1rem", position: "relative" }}>
          <div style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "0.75rem",
            fontWeight: 700,
            color: "#053f90ff",
            fontSize: "1.20rem",
          }}>
            Total Amount: ₹{totalAmount.toLocaleString("en-IN")}
          </div>

          <Table rows={currentRows} startIndex={startIndex} />
          {isLoading && <Loader overlay color="#10b981" size={48} />}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </div>
    </div>
  );
};

export default ViewInvestmentSalaryDetails;