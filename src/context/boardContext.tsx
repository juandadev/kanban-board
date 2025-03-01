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

type BoardActionsType =
  | {
      type: "UPDATE_COLUMNS";
      payload: {
        columns: Omit<ColumnType, "boardId">[];
      };
    }
  | {
      type: "UPDATE_BOARD_NAME";
      payload: {
        name: string;
      };
    };

const initialState: BoardStateType = {
  activeBoardId: 1,
  boards: [{ id: 1, name: "Platform Launch" }],
  columns: [],
  tasks: [],
  subtasks: [],
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
    case "UPDATE_COLUMNS": {
      const { columns } = action.payload;

      const assignColumnsToBoard: ColumnType[] = columns.map((column) => ({
        ...column,
        boardId: state.activeBoardId,
      }));

      return {
        ...state,
        columns: [...state.columns, ...assignColumnsToBoard],
      };
    }

    case "UPDATE_BOARD_NAME":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== state.activeBoardId) return board;

          return {
            ...board,
            name: action.payload.name,
          };
        }),
      };

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
