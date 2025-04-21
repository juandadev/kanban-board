import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { BoardsState, BoardsContextType } from "@/types/board";
import { boardReducer } from "@/context/boards/BoardsReducer";
import { getBoardById, getBoards } from "@/services/boards";
import { GetBoardsByIdResponse, GetBoardsResponse } from "@/types/services";
import CustomToast from "@/components/shared/CustomToast/CustomToast";

const initialState: BoardsState = {
  activeBoardId: "",
  boards: [],
  activeBoard: {
    id: "",
    name: "",
    user_id: "",
    work_schedule: null,
    columns: [],
    board_members: [],
    invitations: [],
    created_at: null,
    updated_at: null,
  },
};

const BoardsContext = createContext<BoardsContextType | null>(null);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const fetchBoards = useCallback(async () => {
    const data = await CustomToast.Promise({ promise: getBoards() });

    const { payload } = data as GetBoardsResponse;

    if (payload.boards.length > 0)
      dispatch({
        type: "INITIALIZE_BOARDS",
        payload: {
          boards: payload.boards,
        },
      });
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const fetchActiveBoard = useCallback(async (id: string) => {
    const data = await CustomToast.Promise({ promise: getBoardById(id) });

    const { payload } = data as GetBoardsByIdResponse;

    dispatch({
      type: "SET_ACTIVE_BOARD",
      payload: {
        activeBoard: payload.board,
      },
    });
  }, []);

  useEffect(() => {
    const activeBoard = state.boards.find(
      (board) => board.id === state.activeBoardId,
    );

    if (activeBoard) {
      fetchActiveBoard(activeBoard.id);
    }
  }, [fetchActiveBoard, state.activeBoardId, state.boards]);

  return (
    <BoardsContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardsContext);

  if (!context) {
    throw new Error("useBoardContext must be used within an BoardProvider");
  }

  return context;
};
