import React from "react";
import { TodoEntry } from "../../types/todo";
import { Check, Trash } from "react-bootstrap-icons";
import { formatToINRCurrency } from "../../utils/amountFormat";

interface Props {
  entry: TodoEntry;
  onDelete: () => void;
  onSave: (updated: TodoEntry) => void;
}

const ReadOnlyTodo: React.FC<Props> = ({ entry, onDelete, onSave }) => {
  return (
    <tr className={entry.status ? "table-success text-muted" : ""}>
      <td className="border">
        {entry.status ? <del>{entry.bankName}</del> : entry.bankName}
      </td>
      <td className="border">
        {entry.status ? (
          <del>{formatToINRCurrency(Number(entry.amount))}</del>
        ) : (
          formatToINRCurrency(Number(entry.amount))
        )}
      </td>
      <td className="border">
        {entry.status ? <del>{entry.month}</del> : entry.month}
      </td>
      <td className="border">
        {entry.status ? <del>{entry.toInvestment}</del> : entry.toInvestment}
      </td>
      <td className="border">
        {entry.status ? <del>{entry.reason}</del> : entry.reason}
      </td>
      <td className="border d-flex gap-3 justify-content-center p-2">
        <button
          className={`btn ${
            entry.status ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => onSave({ ...entry, status: "completed" })}
          title={entry.status ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <Check size={20} />
        </button>

        <button className="btn btn-outline-danger" onClick={onDelete}>
          <Trash size={20} />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyTodo;
