import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-controls mt-3 d-flex justify-content-end gap-2 mb-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationControls;