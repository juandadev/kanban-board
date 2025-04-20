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
import { getBoards } from "@/services/boards";

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

  const fetchBoards = useCallback(() => {
    getBoards().then((data) => {
      dispatch({
        type: "INITIALIZE_BOARDS",
        payload: {
          boards: data,
        },
      });
    });
    // TODO: Implement toast notifications for status messages
    // .catch((error) => {})
    // .finally(() => {});
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

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
