import React from "react";
import { TransactionRow } from "./types";
import { styles } from "./styles";

type Props = {
  rows: TransactionRow[];
  startIndex: number;
  formatter: Intl.DateTimeFormat;
};

const TransactionTable: React.FC<Props> = ({ rows, startIndex, formatter }) => (
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Serial</th>
        <th style={styles.th}>Name</th>
        <th style={styles.th}>Amount</th>
        <th style={styles.th}>Date</th>
        <th style={styles.th}>Vendor</th>
        <th style={styles.th}>Card No.</th>
        <th style={styles.th}>Mode</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={startIndex + index} style={styles.tr}>
          <td style={styles.td}>{startIndex + index + 1}</td>
          <td style={styles.td}>{row.name}</td>
          <td style={{
            ...styles.td,
            ...(row.mode === "cashback" ? styles.modeCashback : row.mode === "invest" ? styles.modeInvest : {}),
          }}>
            ₹{row.amount.toLocaleString("en-IN")}
          </td>
          <td style={styles.td}>{formatter.format(new Date(row.date))}</td>
          <td style={styles.td}>{row.vendor}</td>
          <td style={styles.cardno}>XXXX XXXX XXXX {row.cardno}</td>
          <td style={{
            ...styles.td,
            ...(row.mode === "cashback" ? styles.modeCashback : row.mode === "invest" ? styles.modeInvest : {}),
          }}>
            {row.mode}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionTable;