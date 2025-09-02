import React from "react";
import { CreditFormData } from "./types";
import { styles } from "./styles";
import { formatter } from "../../utils/formatterDate";

type Props = {
  data: CreditFormData[];
  currentPage: number;
  rowsPerPage: number;
};

const SalaryTable: React.FC<Props> = ({ data, currentPage, rowsPerPage }) => (
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
      {data.map((entry, index) => (
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
          <td style={styles.td}>{formatter.format(new Date(entry.date))}</td>
          <td style={styles.td}>{entry.bankname}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SalaryTable;