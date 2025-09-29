export function calculateTotal<T>(data: T[], field: keyof T): number {
  return data.reduce((sum, item) => {
    const value = item[field];
    const numericValue = typeof value === "number" ? value : Number(value) || 0;
    return sum + numericValue;
  }, 0);
}
