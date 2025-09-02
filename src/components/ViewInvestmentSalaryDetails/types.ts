// types.ts
export type TableRow = {
  reason: string;
  amount: number;
  date: string;
};

export type PaginatedTableProps = {
  data: TableRow[];
  rowsPerPage?: number;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
};