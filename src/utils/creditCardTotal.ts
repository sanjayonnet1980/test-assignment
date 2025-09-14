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

  // Define date range: 15th of previous month to 15th of current month
  const startDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 14);
  const endDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 14);

  cards.forEach((card) => {
    const cardDate = new Date(card.date); // assuming card.date is ISO string or Date

    // Filter by date range
    if (cardDate < startDate || cardDate >= endDate) return;

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