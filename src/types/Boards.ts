export type BoardType = {
  id: number;
  name: string;
};

export type ColumnType = {
  id: number;
  name: string;
  boardId: number;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: string;
  columnId: number;
};

export type SubtaskType = {
  id: number;
  title: string;
  isCompleted: boolean;
  taskId: number;
};
