// Table.tsx
import React from "react";
import { Hand, ArrowUpRight, IndianRupee } from "lucide-react";
import { formatter } from "../../utils/formatterDate";
import { TableRow } from "./types";
import { styles } from "./styles";

type Props = {
  rows: TableRow[];
  startIndex: number;
};

const Table: React.FC<Props> = ({ rows, startIndex }) => (
  <table style={styles.table}>
    <thead style={styles.thead}>
      <tr>
        <th style={styles.th}>Sr No</th>
        <th style={styles.th}>Details</th>
        <th style={styles.th}>Amount</th>
        <th style={styles.th}>Date</th>
      </tr>
    </thead>
    <tbody style={styles.tbody}>
      {rows.map((row, index) => (
        <tr
          key={startIndex + index}
          style={{
            ...styles.tr,
            ...(index % 2 === 0 ? styles.trHover : {}),
          }}
        >
          <td style={styles.td}>{startIndex + index + 1}</td>
          <td style={styles.td}>
            <Hand size={18} color="green" /> {row.reason}
            <ArrowUpRight size={18} />
          </td>
          <td style={styles.td}>
            <IndianRupee size={13} />
            {row.amount.toLocaleString("en-IN")}
          </td>
          <td style={styles.td}>
            {formatter.format(new Date(row.date))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;