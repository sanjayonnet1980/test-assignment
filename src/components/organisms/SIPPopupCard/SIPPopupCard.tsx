import React, { useEffect } from "react";
import Loader from "../../atoms/Loader";
import SIPTableRow from "./SIPTableRow";
import { useSIPRowEdit } from "./useSIPRowEdit";
import styles from "./sipPopupCard.module.css";
import { SIPEntry } from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: SIPEntry[];
  onEdit: (entry: SIPEntry) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  loadData: () => void;
}

const SIPPopupCard: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onEdit,
  onDelete,
  isLoading,
  loadData,
}) => {
  const { editRowId, editValues, startEdit, cancelEdit, handleChange } =
    useSIPRowEdit();

  const handleSave = (id: number) => {
    const updatedEntry: SIPEntry = {
      id,
      sipName: editValues.sipName ?? "",
      amount: Number(editValues.amount),
      folioNumber: Number(editValues.folioNumber),
    };
    onEdit(updatedEntry);
    cancelEdit();
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  if (!isOpen) return null;  

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.heading}>SIP Details</h2>
          <button className={styles.closeIcon} onClick={onClose}>
            ×
          </button>
        </div>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.th}>SrNo.</th>
              <th className={styles.th}>SIP Name</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th}>Folio Number</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <SIPTableRow
                key={entry.id}
                entry={entry}
                index={index}
                isEditing={editRowId === entry.id}
                editValues={editValues}
                onChange={handleChange}
                onEdit={() => startEdit(entry)}
                onCancel={cancelEdit}
                onSave={() => handleSave(entry.id)}
                onDelete={() => onDelete(entry.id)}
              />
            ))}
          </tbody>
        </table>
        {isLoading && <Loader overlay color="#10b981" size={48} />}
      </div>
    </div>
  );
};

export default SIPPopupCard;
