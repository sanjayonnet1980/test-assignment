// index.tsx
import React, { useState } from "react";
import ContactTable from "./ContactTable";
import Pagination from "./Pagination";
import { PopupCardProps } from "./types";
import Loader from "../atoms/Loader";
import "./styles.css";

const ViewContact: React.FC<PopupCardProps> = ({
  data,
  isOpen,
  onClose,
  pageSize = 8,
  isLoading,
  refreshData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxzPnzTm6LYRDvl4cS6SLxHyziOrCOuwxhJ--RLywwaJMAtf1J5XfuRA3PL5vzBuJY/exec";

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <header className="popup-header">
          <h2>Contact Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </header>

        {paginatedData.length > 0 ? (
          <ContactTable
            data={paginatedData}
            scriptUrl={scriptUrl}
            refreshData={refreshData}
          />
        ) : (
          <div
            style={{
              fontWeight: 700,
              fontSize: "20px",
              color: "red",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            No Data found. Please add contact details.
          </div>
        )}

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

export default ViewContact;
