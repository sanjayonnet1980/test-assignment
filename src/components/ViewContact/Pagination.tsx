// Pagination.tsx
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) => (
  <footer className="pagination-controls">
    <button onClick={onPrev} disabled={currentPage === 1}>
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button onClick={onNext} disabled={currentPage === totalPages}>
      Next
    </button>
  </footer>
);

export default Pagination;