export const validateForm = (
  name: string,
  amount: number | "",
  date: string,
  vendor: string
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!vendor.trim()) errors.vendor = "Investment place is required.";
  if (!date) errors.date = "Date is required.";
  if (amount === "" || amount <= 0) errors.amount = "Amount must be greater than 0.";
  return errors;
};