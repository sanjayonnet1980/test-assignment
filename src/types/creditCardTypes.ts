export interface CreditCard {
  id: string;
  cardNumber: string;
  amount: string;
  date: string;
  comments: string;
  mode: string;
}

export const initialRow = {
  cardNumber: "",
  amount: "",
  date: "",
  comments: "",
  mode: "",
};

export type CreditCardRow = {
  cardNumber: string;
  amount: string;
  date: string;
  comments: string;
  mode: string;
};