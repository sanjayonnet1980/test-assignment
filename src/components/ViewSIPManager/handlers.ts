
import { updateMutualFundEntry, deleteMutualFundEntry } from "../../services/mutualFundService";
import { SIPEntry } from "../organisms/SIPPopupCard/type";

export const handleEditEntry = async (entry: SIPEntry, reload: () => void) => {
  const updatedEntry: SIPEntry = {
    ...entry,
    sipName: entry.sipName,
    amount: parseFloat(entry.amount.toString()),
    folioNumber: parseInt(entry.folioNumber.toString()),
  };

  try {
    await updateMutualFundEntry(updatedEntry);
    reload();
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
    reload();
  } catch (error) {
    console.error("Failed to delete entry:", error);
  } finally {
    onComplete();
  }
};