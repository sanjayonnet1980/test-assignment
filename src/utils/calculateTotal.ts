export function calculateTotals<T extends { status?: string }>(
  data: T[],
  field: keyof T
): { completed: number; notCompleted: number } {
  return data.reduce(
    (totals, item) => {
      const value = item[field];
      const numericValue = typeof value === "number" ? value : Number(value) || 0;

      if (item.status === "completed") {
        totals.completed += numericValue;
      } else {
        totals.notCompleted += numericValue;
      }

      return totals;
    },
    { completed: 0, notCompleted: 0 }
  );
}
