import React, { useState } from "react";
import DeleteConfirmCard from "../atoms/DeleteConfirmCard";
import { useSIPManager } from "./useSIPManager";
import { handleEditEntry, handleDeleteEntry } from "./handlers";
import { SIPManagerProps } from "./types";
import SIPPopupCard from "../organisms/SIPPopupCard/SIPPopupCard";
import { SIPEntry } from "../organisms/SIPPopupCard/type";

const ViewSIPManager: React.FC<SIPManagerProps> = ({ isOpen, onClose, sipList }) => {
  const { sipListData, isLoading, loadData } = useSIPManager(sipList);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleEdit = async (entry: SIPEntry) => {
    await handleEditEntry(entry, loadData);
  };

  const handleDelete = (id: number) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDeleteId !== null) {
      await handleDeleteEntry(pendingDeleteId, loadData, () => {
        setConfirmOpen(false);
        setPendingDeleteId(null);
      });
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <>
      <SIPPopupCard
        isOpen={isOpen}
        onClose={onClose}
        data={sipListData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadData={loadData}
      />
      <DeleteConfirmCard
        isOpen={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default ViewSIPManager;