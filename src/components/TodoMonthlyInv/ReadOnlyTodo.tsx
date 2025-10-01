import React from "react";
import { TodoEntry } from "../../types/todo";
import { Check, Icon1Circle, Trash } from "react-bootstrap-icons";
import { formatToINRCurrency } from "../../utils/amountFormat";

interface Props {
  entry: TodoEntry;
  onDelete: () => void;
  onSave: (updated: TodoEntry) => void;
  index: number;
}

const ReadOnlyTodo: React.FC<Props> = ({ entry, onDelete, onSave, index }) => {
  return (
    <tr className={entry.status ? "table-success text-muted" : ""}>
      <td className="border">{index}</td>
      <td className="border">
        {entry.status ? (
          <del className="text-success">{entry.bankName}</del>
        ) : (
          entry.bankName
        )}
      </td>
      <td className="border">
        {entry.status ? (
          <del className="text-success">
            {formatToINRCurrency(Number(entry.amount))}
          </del>
        ) : (
          formatToINRCurrency(Number(entry.amount))
        )}
      </td>
      <td className="border">
        {entry.status ? (
          <del className="text-success">{entry.month}</del>
        ) : (
          entry.month
        )}
      </td>
      <td className="border">
        {entry.status ? (
          <del className="text-success">{entry.toInvestment}</del>
        ) : (
          entry.toInvestment
        )}
      </td>
      <td className="border">
        {entry.status ? (
          <del className="text-success">{entry.reason}</del>
        ) : (
          entry.reason
        )}
      </td>
      <td className="border d-flex gap-3 justify-content-center p-2">
        <button
          className={`btn ${
            entry.status ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() =>
            onSave({ ...entry, status: entry.status ? "" : "completed" })
          }
          title={entry.status ? "Mark as Incomplete" : "Mark as Complete"}
        >
          {entry.status ? <Check size={16} /> : <Icon1Circle size={16} />}
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={onDelete}
          title="Do you want to delete?"
        >
          <Trash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyTodo;
