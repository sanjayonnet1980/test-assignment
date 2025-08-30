import React from "react";
import { cardInvestAmount } from "./cardwiseInvestAmount";

type Props = {
  data: TransactionRow[] | null;
  cardno: string;
};

type TransactionRow = {
  name: string;
  amount: number;
  date: string;
  vendor: string;
  cardno: string;
  mode: "Invest" | "cashback"; // strict typing for mode
};

const InvestmentSummary: React.FC<Props> = ({ data, cardno }) => {
  const netAmount = data ? cardInvestAmount(data, cardno) : "0";

  return (
    <div>
      <strong>₹{netAmount}</strong> | Total Investment of ({netAmount})
    </div>
  );
};

export default InvestmentSummary;