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
import { calculateTotal } from "../../utils/calculateTotal";

interface Props {
  refreshTrigger: boolean;
}

const ViewTodoInvTable: React.FC<Props> = ({ refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { todoInvDetails } = useAppSelector((state) => state.viewAddTodoPlan);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch, refreshTrigger]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodoInvPlans(id));
  };

  const handleSave = (updated: TodoEntry) => {
    dispatch(updateTodoInv(updated));
  };

  const paginatedData = todoInvDetails.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(todoInvDetails.length / pageSize);

  const totalAmount = calculateTotal(todoInvDetails, "amount");


  return (
    <div style={{ width: "1060px", marginLeft: "50px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-bold text-warning text-uppercase">
          View Todo Monthly Plans..
        </div>
        <div className="fw-bold text-success">
          Total Amount - {formatToINRCurrency(totalAmount)}
        </div>
      </div>

      <table className="border w-100">
        <TodoHeaders />
        <tbody>
          {paginatedData.map((todo: TodoEntry) => (
            <ReadOnlyTodo
              key={todo.id}
              entry={todo}
              onDelete={() => handleDelete(todo?.id ?? "")}
              onSave={handleSave}
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
