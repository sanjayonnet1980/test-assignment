import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatToINRCurrency } from "./amountFormat";

interface CreditCardEntry {
  cardNumber: string;
  amount: number | string;
  date: string;
  comments: string;
  mode: string;
}

/**
 * Generates and downloads a PDF report of credit card data
 * @param data - Array of credit card entries
 * @param filename - Optional filename for the PDF
 */
export function handleDownloadPDF(data: CreditCardEntry[], filename = "CreditCardReport.pdf"): void {
  const doc = new jsPDF();

  // Calculate total amount (only numeric values)
  const totalAmount = data.reduce((sum, entry) => {
    const value = typeof entry.amount === "number" ? entry.amount : parseFloat(entry.amount);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const formattedTotal = formatToINRCurrency(totalAmount);

  // Header
  doc.setFontSize(16);
  doc.text("Credit Card Investment Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Total Amount: ${formattedTotal}`, 14, 28); // Display total just below title

  // Table data
  const tableBody = data.map((entry) => [
    `XXXX-XXXX-XXXX-${entry.cardNumber}`,
    typeof entry.amount === "number" ? formatToINRCurrency(entry.amount) : entry.amount,
    entry.date,
    entry.comments,
    entry.mode,
  ]);

  autoTable(doc, {
    startY: 35,
    head: [["Card Number", "Amount", "Date", "Comments", "Mode"]],
    body: tableBody,
    styles: { fontSize: 10 },
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save(filename);
}