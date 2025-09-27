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

interface Props {
  refreshTrigger: boolean;
}

const ViewTodoInvTable: React.FC<Props> = ({ refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { todoInvDetails } = useAppSelector((state) => state.viewAddTodoPlan);
  const [page, setPage] = useState(1);
  const pageSize = 5;

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

  return (
    <div style={{ width: "1060px", marginLeft: "50px" }}>
      <div className="fw-bold mb-3 text-warning text-uppercase">
        View Todo Monthly Plans..
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
