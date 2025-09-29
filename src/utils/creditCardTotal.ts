import { CreditCard } from "../types/creditCardTypes";

export interface CardWiseTotals {
  [cardNumber: string]: {
    cashbackTotal: number;
    investmentTotal: number;
    billingTotal: number; // investment - cashback
  };
}

/**
 * Calculates totals for transactions between 15th of previous month and 15th of current month.
 */
export const calculateCreditCardTotalsByCard = (
  cards: CreditCard[],
  referenceDate: Date = new Date()
): CardWiseTotals => {
  const totals: CardWiseTotals = {};

  // 🔁 Calculate date range
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth(); // 0-indexed

  const startDate = new Date(currentYear, currentMonth - 1, 15); // 15th of previous month
  const endDate = new Date(currentYear, currentMonth, 15);       // 15th of current month

  cards.forEach((card) => {
    const cardDate = new Date(card.date); // assuming card.date is a valid ISO string
    if (cardDate >= startDate && cardDate <= endDate) return; // ⛔ Skip out-of-range

    const cardNum = card.cardNumber;
    const mode = card.mode.toLowerCase();
    const amount = parseFloat(card.amount);

    if (!totals[cardNum]) {
      totals[cardNum] = {
        cashbackTotal: 0,
        investmentTotal: 0,
        billingTotal: 0,
      };
    }

    if (mode.includes("cashback")) {
      totals[cardNum].cashbackTotal += amount;
    } else if (mode.includes("invest")) {
      totals[cardNum].investmentTotal += amount;
    }

    totals[cardNum].billingTotal =
      totals[cardNum].investmentTotal - totals[cardNum].cashbackTotal;
  });

  return totals;
};