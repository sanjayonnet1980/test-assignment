/**
 * Formats a number into Indian currency style with rupee symbol.
 * @param amount - The numeric amount to format
 * @returns Formatted string like ₹1,32,518.50
 */
export function formatToINRCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

  // Ensure exactly one space between ₹ and the number
  return formatted.replace(/^(\D+)/, (match) => match.trim() + "");
}
