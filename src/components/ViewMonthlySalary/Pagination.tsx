import React from "react";
import { styles } from "./styles";
import Button from "../atoms/Button";

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
  <div style={styles.pagination}>
    <Button label="Prev" onClick={onPrev} disabled={currentPage === 1} classname="" />
    <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
    <Button label="Next" onClick={onNext} disabled={currentPage === totalPages} classname="" />
  </div>
);

export default Pagination;