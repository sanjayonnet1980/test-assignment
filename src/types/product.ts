export type ProductType = 'rice' | 'flour';

export interface SellEntry {
  id: string;
  product: ProductType;
  quantityKg: number;
  pricePerKg: number;
  date: string;
  time: string;
}

export const barcodeMap: Record<string, 'rice' | 'flour'> = {
  'RICE001': 'rice',
  'RICE002': 'rice',
  'FLOUR001': 'flour',
  'FLOUR002': 'flour',
};
