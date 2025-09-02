// types.ts
export interface Contact {
  srno: number;
  name: string;
  phone: string;
  address: string;
  relationship: string;
}

export interface PopupCardProps {
  data: Contact[];
  isOpen: boolean;
  onClose: () => void;
  pageSize?: number;
  isLoading: boolean;
  refreshData: () => void;
}
