export function findTotal<T>(data: T[], getValue: (item: T) => number): number {
  return data.reduce((sum, item) => {
    const value = getValue(item);
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}
