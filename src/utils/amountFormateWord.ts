export function formatAmountToIndianWords(amount: number): string {
  const units = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const scales = ["", "Thousand", "Lakh", "Crore"];

  const numToWords = (num: number): string => {
    if (num === 0) return "Zero";

    let words = "";

    const getTwoDigit = (n: number): string => {
      if (n < 20) return units[n];
      const ten = Math.floor(n / 10);
      const unit = n % 10;
      return tens[ten] + (unit ? " " + units[unit] : "");
    };

    const getThreeDigit = (n: number): string => {
      const hundred = Math.floor(n / 100);
      const rest = n % 100;
      let result = "";
      if (hundred) result += units[hundred] + " Hundred";
      if (rest) result += (result ? " " : "") + getTwoDigit(rest);
      return result;
    };

    const segments: number[] = [];
    segments.push(num % 1000); // hundreds
    num = Math.floor(num / 1000);
    segments.push(num % 100); // thousands
    num = Math.floor(num / 100);
    segments.push(num % 100); // lakhs
    num = Math.floor(num / 100);
    segments.push(num); // crores

    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i]) {
        words += getThreeDigit(segments[i]) + " " + scales[i] + " ";
      }
    }

    return words.trim();
  };

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  const rupeeWords = numToWords(rupees) + " Rupees";
  const paiseWords = paise ? " and " + numToWords(paise) + " Paise" : "";

  return rupeeWords + paiseWords;
}