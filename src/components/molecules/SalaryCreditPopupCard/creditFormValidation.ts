import { CreditFormData } from "./SalaryCreditPopupCard";


export const validateCreditForm = (formData: CreditFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!formData.month) errors.month = "Month is required.";
  if (formData.creditAmount <= 0) errors.creditAmount = "Amount must be greater than 0.";
  if (!formData.date) errors.date = "Date is required.";
  if (!formData.bankName.trim()) errors.bankName = "Bank name is required.";
  return errors;
};