import React from "react";
import { cardInvestAmount } from "../../utils/cardwiseInvestAmount";
import { TransactionRow } from "./types";

type Props = {
  data: TransactionRow[];
  totalInvest: number;
  totalCashback: number;
};

const Summary: React.FC<Props> = ({ data, totalInvest, totalCashback }) => (
  <div style={{
    display: "flex",
    justifyContent: "right",
    marginBottom: "0.75rem",
    fontWeight: 700,
    color: "#053f90ff",
    fontSize: "1.20rem",
  }}>
    Total Investment of (4188): ₹{cardInvestAmount(data, 4188)} | Total of (5549): ₹{cardInvestAmount(data, 5549)} | Bill Total: ₹{(totalInvest - totalCashback).toLocaleString("en-IN")}
  </div>
);

export default Summary;