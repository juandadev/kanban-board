import { useBoardContext } from "@/context/boards/BoardsContext";
import { Board, ActiveBoard } from "@/types/board";

type useActiveBoardReturnType = {
  boards: Board[];
  activeBoardId: string;
  activeBoard: ActiveBoard;
};

export function useActiveBoard(): useActiveBoardReturnType {
  const { state } = useBoardContext();
  const { boards, activeBoardId, activeBoard } = state;

  return {
    boards,
    activeBoardId,
    activeBoard,
  };
}
