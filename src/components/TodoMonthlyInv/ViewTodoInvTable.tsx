import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteTodoInvPlans,
  fetchTodoLists,
  updateTodoInv,
} from "../../features/TODOMonthlyInvPlans/todoSlice";
import { TodoEntry } from "../../types/todo";
import TodoHeaders from "./TodoHeaders";
import PaginationControls from "../../atoms/PaginationControls";
import ReadOnlyTodo from "./ReadOnlyTodo";
import { formatToINRCurrency } from "../../utils/amountFormat";
import { calculateTotals } from "../../utils/calculateTotal";

interface Props {
  refreshTrigger: boolean;
}

const ViewTodoInvTable: React.FC<Props> = ({ refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { todoInvDetails } = useAppSelector((state) => state.viewAddTodoPlan);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [searchMonth, setSearchMonth] = useState("");

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch, refreshTrigger]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodoInvPlans(id));
  };

  const handleSave = (updated: TodoEntry) => {
    dispatch(updateTodoInv(updated));
  };

  const filteredData = todoInvDetails.filter((todo) =>
    todo.month?.toLowerCase().includes(searchMonth.toLowerCase())
  ).sort((a, b) => a.status.localeCompare(b.status));

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const totalAmount = calculateTotals(filteredData, "amount");

  return (
    <div style={{ width: "1060px", marginLeft: "50px" }}>
      <div className="w-100">
        <h5 className="card-title text-muted text-uppercase fw-bold mb-1 fs-4">
          View Todo List Plans
        </h5>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by month"
          className="form-control"
          style={{ width: "200px" }}
          value={searchMonth}
          onChange={(e) => {
            setSearchMonth(e.target.value);
            setPage(1); // Reset to first page on search
          }}
        />

        <div className="fw-bold text-success">
          Total Completed Amount - {formatToINRCurrency(totalAmount.completed)}
        </div>
        <div className="fw-bold text-success">
          Total TODO Amount - {formatToINRCurrency(totalAmount.notCompleted)}
        </div>
      </div>

      <table className="border w-100">
        <TodoHeaders />
        <tbody>
          {paginatedData.map((todo: TodoEntry, index: number) => (
            <ReadOnlyTodo
              key={todo.id}
              entry={todo}
              onDelete={() => handleDelete(todo?.id ?? "")}
              onSave={handleSave}
              index = {index+1}
            />
          ))}
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

export default ViewTodoInvTable;
