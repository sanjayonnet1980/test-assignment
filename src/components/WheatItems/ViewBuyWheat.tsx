import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BuyWheatEntry,
  deleteBuyWheat,
  fetchBuyWheat,
  updateBuyWheat,
} from "../../features/WheatItems/buyWheatSlice";
import TableHeader from "./WheatHeader";
import EditableRow from "./EditableWheat";
import ReadOnlyRow from "./ReadOnlyWheatRow";
import HeaderSection from "../../atoms/HeaderSection";
import PaginationControls from "../../atoms/PaginationControls";

export const BuyWheatTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { entries, loading, error } = useAppSelector(
    (state) => state.viewWheat
  );
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchBuyWheat());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteBuyWheat(id));
  };

  const handleSave = (updated: BuyWheatEntry) => {
    dispatch(updateBuyWheat(updated));
    setEditId(null);
  };

  const paginatedData = entries
    .slice((page - 1) * pageSize, page * pageSize)
    .sort(
      (a, b) =>
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    );
  const totalPages = Math.ceil(entries.length / pageSize);

  const [editData, setEditData] = useState<BuyWheatEntry | null>(null);

  const handleChange = (field: keyof BuyWheatEntry, value: string | number) => {
    if (!editData) return;
    setEditData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = (entry: BuyWheatEntry) => {
    setEditId(entry.id);
    setEditData(entry); // ✅ This ensures editData is not null
  };

  return (
    <div className="page-container">
      <div className="card border border border-warning">
        <HeaderSection text={"View Wheat Investment Directory"} />
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <table className="border w-100">
                <TableHeader />
                <tbody>
                  {paginatedData.map((entry: BuyWheatEntry) =>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
