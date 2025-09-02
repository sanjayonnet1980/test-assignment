export interface CreditFormData {
  month: string;
  creditamount: number;
  date: string;
  bankname: string;
}

export interface CreditTablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: CreditFormData[];
  rowsPerPage?: number;
  isLoading: boolean;
}