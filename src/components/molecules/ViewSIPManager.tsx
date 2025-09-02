import React, { useCallback, useEffect, useState } from "react";
import SIPPopupCard, { SIPEntry } from "./SIPPopupCard";
import {
  deleteMutualFundEntry,
  fetchMutualFundData,
  updateMutualFundEntry,
} from "../../services/mutualFundService";
import DeleteConfirmCard from "../atoms/DeleteConfirmCard";

interface SIPManagerProps {
  isOpen: boolean;
  onClose: () => void;
  sipList: SIPEntry[];
}

const ViewSIPManager: React.FC<SIPManagerProps> = ({
  isOpen,
  onClose,
  sipList,
}) => {
  const [sipListData, setSipListData] = useState<SIPEntry[]>(sipList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = useCallback(async () => {
  setIsLoading(true);
  try {
    const data = await fetchMutualFundData();
    setSipListData(data);
  } catch (error) {
    console.error("Failed to fetch mutual fund data:", error);
  } finally {
    setIsLoading(false);
  }
}, []);


  useEffect(() => {
    loadData();
    setIsLoading(false);
  }, [loadData,sipListData]);

  const handleEdit = async (entry: SIPEntry) => {
    const updatedEntry: SIPEntry = {
      ...entry,
      sipName: entry.sipName,
      amount: parseFloat(entry.amount.toString()),
      folioNumber: parseInt(entry.folioNumber.toString()),
    };

    try {
      await updateMutualFundEntry(updatedEntry);
      await loadData(); // Refresh list after update
    } catch (error) {
      console.error("Failed to update entry:", error);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDeleteId !== null) {
      try {
        await deleteMutualFundEntry(pendingDeleteId);
        await loadData(); // Refresh list after delete
      } catch (error) {
        console.error("Failed to delete entry:", error);
      } finally {
        setConfirmOpen(false);
        setPendingDeleteId(null);
      }
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
