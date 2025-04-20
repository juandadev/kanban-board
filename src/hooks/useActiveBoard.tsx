import { useBoardContext } from "@/context/boardContext";
import { Board, Column, Subtask, Task } from "@/types";

type useActiveBoardReturnType = {
  board: Board | null;
  columns: Column[];
  tasks: Task[];
  subtasks: Subtask[];
};

export function useActiveBoard(): useActiveBoardReturnType {
  const { state } = useBoardContext();
  const { activeBoardId, boards, columns, tasks, subtasks } = state;
  const activeBoard = boards.find((board) => board.id === activeBoardId);

  if (!activeBoard) {
    return {
      board: null,
      columns: [],
      subtasks: [],
      tasks: [],
    };
  }

  const activeColumns = columns.filter(
    (column) => column.board_id === activeBoard.id,
  );

  const activeTasks: Task[] = [];
  activeColumns.forEach((column) => {
    const filteredTasks = tasks.filter((task) => task.column_id === column.id);
    activeTasks.push(...filteredTasks);
  });

  const activeSubtasks: Subtask[] = [];
  activeTasks.forEach((task) => {
    const filteredSubtasks = subtasks.filter(
      (subtask) => subtask.task_id === task.id,
    );
    activeSubtasks.push(...filteredSubtasks);
  });

  return {
    board: activeBoard,
    columns: activeColumns,
    subtasks: activeSubtasks,
    tasks: activeTasks,
  };
}
