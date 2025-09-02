export type TransactionRow = {
  name: string;
  amount: number;
  date: string;
  vendor: string;
  cardno: string;
  mode: string;
};

export type TransactionPopupCardProps = {
  data: TransactionRow[];
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  rowsPerPage?: number;
};