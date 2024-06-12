import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { BoardType, ColumnType, SubtaskType, TaskType } from "@/types/Boards";

type BoardStateType = {
  activeBoardId: number;
  boards: BoardType[];
  columns: ColumnType[];
  tasks: TaskType[];
  subtasks: SubtaskType[];
};

type BoardActionsType = { type: "ADD_COLUMN" };

const initialState: BoardStateType = {
  activeBoardId: 1,
  boards: [
    { id: 1, name: "Platform Launch" },
    { id: 2, name: "Roadmap" },
  ],
  columns: [
    { id: 1, name: "Todo", boardId: 1 },
    { id: 2, name: "Doing", boardId: 1 },
    { id: 3, name: "Done", boardId: 1 },
    { id: 4, name: "Now", boardId: 2 },
    { id: 5, name: "Next", boardId: 2 },
    { id: 6, name: "Later", boardId: 2 },
  ],
  tasks: [
    {
      id: 1,
      title: "Build UI for onboarding flow",
      description: "",
      status: "Todo",
      columnId: 1,
    },
    {
      id: 2,
      title: "Build UI for search",
      description: "",
      status: "Doing",
      columnId: 2,
    },
  ],
  subtasks: [
    {
      id: 1,
      title: "Sign up page",
      isCompleted: true,
      taskId: 1,
    },
    {
      id: 2,
      title: "Sign in page",
      isCompleted: false,
      taskId: 1,
    },
    {
      id: 3,
      title: "Welcome page",
      isCompleted: false,
      taskId: 1,
    },
    {
      id: 4,
      title: "Search page",
      isCompleted: false,
      taskId: 2,
    },
  ],
};

const BoardContext = createContext<{
  state: BoardStateType;
  dispatch: Dispatch<BoardActionsType>;
} | null>(null);

const boardReducer = (
  state: BoardStateType,
  action: BoardActionsType,
): BoardStateType => {
  switch (action.type) {
    case "ADD_COLUMN":
      return state;

    default:
      return state;
  }
};

export const BoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoardContext must be used within an BoardProvider");
  }

  return context;
};
