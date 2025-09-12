/**
 * Converts a date string (YYYY-MM-DD) into "15ᵗʰ Aug 2025" with superscript ordinal suffix
 * @param isoDate - Date string in ISO format
 * @returns Formatted date with Unicode superscript suffix
 */
export function formatDateWithUnicodeOrdinal(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const superscriptMap: Record<string, string> = {
    st: "ˢᵗ",
    nd: "ⁿᵈ",
    rd: "ʳᵈ",
    th: "ᵗʰ",
  };

  const getOrdinalSuffix = (n: number): string => {
    if (n >= 11 && n <= 13) return superscriptMap["th"];
    switch (n % 10) {
      case 1: return superscriptMap["st"];
      case 2: return superscriptMap["nd"];
      case 3: return superscriptMap["rd"];
      default: return superscriptMap["th"];
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}