import { CreditCardRow } from "../types/creditCardTypes";

export const validateRow = (row: CreditCardRow): CreditCardRow => {
    return {
      cardNumber:
        row.cardNumber.length !== 4 ? "Card number must be 4 digits" : "",
      amount: row.amount === "" ? "Amount is required" : "",
      date: row.date === "" ? "Date is required" : "",
      comments: row.comments === "" ? "Comments required" : "",
      mode: row.mode === "" ? "Mode is required" : "",
    };
  };
  