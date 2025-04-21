import { useBoardContext } from "@/context/boards/BoardsContext";
import { Board, ActiveBoard, CreateNewBoardPayload } from "@/types/board";

type useActiveBoardReturnType = {
  boards: Board[];
  activeBoardId: string;
  activeBoard: ActiveBoard;
  createBoard: (_data: Partial<CreateNewBoardPayload>) => void;
};

export function useActiveBoard(): useActiveBoardReturnType {
  const { state, dispatch } = useBoardContext();
  const { boards, activeBoardId, activeBoard } = state;

  const createBoard = (data: Partial<CreateNewBoardPayload>) => {
    const { name } = data;

    dispatch({
      type: "CREATE_BOARD",
      payload: {
        name: name!,
      },
    });
  };

  return {
    boards,
    activeBoardId,
    activeBoard,
    createBoard,
  };
}
