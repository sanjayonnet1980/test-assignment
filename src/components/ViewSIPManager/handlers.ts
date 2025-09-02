
import { updateMutualFundEntry, deleteMutualFundEntry } from "../../services/mutualFundService";
import { SIPEntry } from "../molecules/SIPPopupCard";

export const handleEditEntry = async (entry: SIPEntry, reload: () => void) => {
  const updatedEntry: SIPEntry = {
    ...entry,
    sipName: entry.sipName,
    amount: parseFloat(entry.amount.toString()),
    folioNumber: parseInt(entry.folioNumber.toString()),
  };

  try {
    await updateMutualFundEntry(updatedEntry);
    await reload();
  } catch (error) {
    console.error("Failed to update entry:", error);
  }
};

export const handleDeleteEntry = async (
  id: number,
  reload: () => void,
  onComplete: () => void
) => {
  try {
    await deleteMutualFundEntry(id);
    await reload();
  } catch (error) {
    console.error("Failed to delete entry:", error);
  } finally {
    onComplete();
  }
};