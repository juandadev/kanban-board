import { useBoardContext } from "@/context/boardContext";
import { BoardType, ColumnType, SubtaskType, TaskType } from "@/types/Boards";

type useActiveBoardReturnType = {
  board: BoardType | null;
  columns: ColumnType[];
  tasks: TaskType[];
  subtasks: SubtaskType[];
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
    (column) => column.boardId === activeBoard.id,
  );

  const activeTasks: TaskType[] = [];
  activeColumns.forEach((column) => {
    const filteredTasks = tasks.filter((task) => task.columnId === column.id);
    activeTasks.push(...filteredTasks);
  });

  const activeSubtasks: SubtaskType[] = [];
  activeTasks.forEach((task) => {
    const filteredSubtasks = subtasks.filter(
      (subtask) => subtask.taskId === task.id,
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
