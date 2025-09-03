import React from "react";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import styles from "./sipPopupCard.module.css";
import { SIPEntry } from "./type";

interface Props {
  entry: SIPEntry;
  index: number;
  isEditing: boolean;
  editValues: Partial<SIPEntry>;
  onChange: (field: keyof SIPEntry, value: string | number) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const SIPTableRow: React.FC<Props> = ({
  entry,
  index,
  isEditing,
  editValues,
  onChange,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) => (
  <tr className={styles.tr}>
    <td className={styles.td}>{index + 1}</td>
    <td className={styles.td}>
      {isEditing ? (
        <input
          type="text"
          value={editValues.sipName ?? entry.sipName}
          onChange={(e) => onChange("sipName", e.target.value)}
          className={styles.input}
        />
      ) : (
        entry.sipName
      )}
    </td>
    <td className={styles.td}>
      {isEditing ? (
        <input
          type="number"
          value={editValues.amount ?? entry.amount}
          onChange={(e) => onChange("amount", e.target.value)}
          className={styles.input}
        />
      ) : (
        entry.amount
      )}
    </td>
    <td className={styles.td}>
      {isEditing ? (
        <input
          type="number"
          value={editValues.folioNumber ?? entry.folioNumber}
          onChange={(e) => onChange("folioNumber", e.target.value)}
          className={styles.input}
        />
      ) : (
        entry.folioNumber
      )}
    </td>
    <td className={styles.td}>
      {isEditing ? (
        <>
          <button className={styles.iconBtn} onClick={onSave} title="Save">
            <Check size={18} />
          </button>
          <button className={styles.iconBtn} onClick={onCancel} title="Cancel">
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <button className={styles.iconBtn} onClick={onEdit} title="Edit">
            <Pencil size={18} />
          </button>
          <button className={styles.iconBtn} onClick={onDelete} title="Delete">
            <Trash2 size={18} />
          </button>
        </>
      )}
    </td>
  </tr>
);

export default SIPTableRow;