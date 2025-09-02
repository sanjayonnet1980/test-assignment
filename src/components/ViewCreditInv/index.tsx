import React, { useState } from "react";
import { TransactionPopupCardProps } from "./types";
import { styles } from "./styles";
import Header from "./Header";
import Summary from "./Summary";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";

const ViewCreditInv: React.FC<TransactionPopupCardProps> = ({
  data,
  isOpen,
  onClose,
  isLoading,
  rowsPerPage = 12,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalInvestAmount = data.reduce((sum, row) => row.mode === "Invest" ? sum + row.amount : sum, 0);
  const totalCashbackAmount = data.reduce((sum, row) => row.mode === "cashback" ? sum + row.amount : sum, 0);

  if (!isOpen) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <Header title="Credit Card Inv. Transaction Details" onClose={onClose} />
        <div style={{ padding: "1rem", position: "relative" }}>
          <Summary data={data} totalInvest={totalInvestAmount} totalCashback={totalCashbackAmount} />
          <TransactionTable rows={currentRows} startIndex={startIndex} formatter={formatter} />
          {currentRows.length < 1 && (
            <div style={{ fontWeight: "700", fontSize: "20px", color: "red", marginTop: "20px" }}>
              No Data found. Please add contact details.
            </div>
          )}
          {isLoading && (
            <div style={styles.loaderOverlay}>
              <div style={styles.loader} />
            </div>
          )}
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

export default ViewCreditInv;