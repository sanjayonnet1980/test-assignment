import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TableHeader from "./WheatHeader";
import EditableRow from "./EditableWheat";
import ReadOnlyRow from "./ReadOnlyWheatRow";
import PaginationControls from "../../atoms/PaginationControls";
import { BuyRiceEntry, deleteBuyRice, fetchBuyRice, updateBuyRice } from "../../features/WheatItems/buyRiceSlice";

interface Props {
  refreshTrigger: boolean;
}

export const BuyRiceTable: React.FC<Props> = ({ refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.viewRice);
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchBuyRice());
  }, [dispatch, refreshTrigger]);

  const handleDelete = (id: string) => {
    dispatch(deleteBuyRice(id));
  };

  const handleSave = (updated: BuyRiceEntry) => {
    dispatch(updateBuyRice(updated));
    setEditId(null);
  };

  const paginatedData = entries
    .slice((page - 1) * pageSize, page * pageSize)
    .sort(
      (a, b) =>
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    );
  const totalPages = Math.ceil(entries.length / pageSize);

  const [editData, setEditData] = useState<BuyRiceEntry | null>(null);

  const handleChange = (field: keyof BuyRiceEntry, value: string | number) => {
    if (!editData) return;
    setEditData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = (entry: BuyRiceEntry) => {
    setEditId(entry.id);
    setEditData(entry); // ✅ This ensures editData is not null
  };

  return (
    <div style={{ width: "1060px", marginLeft: "50px" }}>
    <div className="fw-bold mb-3 text-warning text-uppercase">View Data for Buying Rice..</div>
      <table className="border w-100">
        <TableHeader />
        <tbody>
          {paginatedData.map((entry: BuyRiceEntry) =>
            String(editId) === entry.id ? (
              <EditableRow
                key={entry.id}
                editData={editData!}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={() => setEditId(null)}
              />
            ) : (
              <ReadOnlyRow
                key={entry.id}
                entry={entry}
                onEdit={() => handleEdit(entry)}
                onDelete={() => handleDelete(entry.id.toString())}
              />
            )
          )}
        </tbody>
      </table>

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
