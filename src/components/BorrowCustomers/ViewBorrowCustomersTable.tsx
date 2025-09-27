import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BorrowCustomers,
  deleteBorrowCustomers,
  fetchBorrowCustomers,
  updateBorrowCustomers,
} from "../../features/BorrowCustomers/borrowCustomers";
import BorrowTableHeader from "./BorrowTableHeader";
import PaginationControls from "../../atoms/PaginationControls";
import ReadOnlyBorrowCustomers from "./ReadOnlyBorrowCustomers";
import EditableBorrowData from "./EditableBorrowData";

interface Props {
  refreshTrigger: boolean;
}

const ViewBorrowCustomersTable: React.FC<Props> = ({ refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.viewAddBorrowCutomer);
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchBorrowCustomers());
  }, [dispatch, refreshTrigger]);

  const handleDelete = (id: string) => {
    dispatch(deleteBorrowCustomers(id));
  };

  const handleSave = (updated: BorrowCustomers) => {
    dispatch(updateBorrowCustomers(updated));
    setEditId(null);
  };

  const paginatedData = entries
    .slice((page - 1) * pageSize, page * pageSize)
    .sort(
      (a, b) =>
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    );
  const totalPages = Math.ceil(entries.length / pageSize);

  const [editData, setEditData] = useState<BorrowCustomers | null>(null);

  const handleChange = (
    field: keyof BorrowCustomers,
    value: string | number
  ) => {
    if (!editData) return;
    setEditData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = (entry: BorrowCustomers) => {
    setEditId(entry?.id ?? null);
    setEditData(entry); // ✅ This ensures editData is not null
  };
  return (
    <div style={{ width: "1060px", marginLeft: "50px" }}>
      <div className="fw-bold mb-3 text-warning text-uppercase">
        View Borrow Customers detail..
      </div>
      <table className="border w-100">
        <BorrowTableHeader />
        <tbody>
          {paginatedData.map((entry: BorrowCustomers) =>
            String(editId) === entry.id ? (
              <EditableBorrowData
                key={entry.id}
                editData={editData!}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={() => setEditId(null)}
              />
            ) : (
              <ReadOnlyBorrowCustomers
                key={entry.id}
                entry={entry}
                onEdit={() => handleEdit(entry)}
                onDelete={() => handleDelete(entry?.id ?? "")}
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

export default ViewBorrowCustomersTable;
