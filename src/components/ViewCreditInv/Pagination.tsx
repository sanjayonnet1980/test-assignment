import React from "react";
import { styles } from "./styles";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div style={styles.pagination}>
    <button onClick={onPrev} disabled={currentPage === 1}>◀ Prev</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onClick={onNext} disabled={currentPage === totalPages}>Next ▶</button>
  </div>
);

export default Pagination;