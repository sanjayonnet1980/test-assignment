export type ProductType =
  | "Basmati Rice"
  | "Jasmine Rice"
  | "Sona Masoori Rice"
  | "Jeerakasala Rice"
  | "Rosematta Rice"
  | "Valencia Rice"
  | "Arborio Rice"
  | "Sushi Rice"
  | "Glutinous Rice"
  | "Black Rice"
  | "Red Rice"
  | "Brown Rice"
  | "Atta"

  export const productDropDownTypes = [
  "Basmati Rice",
  "Jasmine Rice",
  "Sona Masoori Rice",
  "Jeerakasala Rice",
  "Rosematta Rice",
  "Valencia Rice",
  "Arborio Rice",
  "Sushi Rice",
  "Glutinous Rice",
  "Black Rice",
  "Red Rice",
  "Brown Rice",
  "Atta",
] as const;


export type paymentType = "Cash" | "Online";

export interface SellEntry {
  id: string;
  product: ProductType;
  quantityKg: number;
  pricePerKg: number;
  date: string;
  time: string;
  modeofpayment: string;
}

export const barcodeMap: Record<string, "rice" | "flour"> = {
  RICE001: "rice",
  RICE002: "rice",
  FLOUR001: "flour",
  FLOUR002: "flour",
};

export const stockProductTypes = ["Rice", "Wheat"] as const;
