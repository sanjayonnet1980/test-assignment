import React, { useState } from "react";
import { CreditTablePopupProps } from "./types";
import { styles } from "./styles";
import Header from "./Header";
import SalaryTable from "./SalaryTable";
import Pagination from "./Pagination";
import Loader from "../atoms/Loader";

const ViewMonthlySalary: React.FC<CreditTablePopupProps> = ({
  isOpen,
  onClose,
  data,
  rowsPerPage = 10,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <Header title="Monthly Salary Details" onClose={onClose} />
        <SalaryTable data={paginatedData} currentPage={currentPage} rowsPerPage={rowsPerPage} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </div>
      {isLoading && <Loader overlay color="#10b981" size={48} />}
    </div>
  );
};

export default ViewMonthlySalary;