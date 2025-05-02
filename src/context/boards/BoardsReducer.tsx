import { BoardsActions, BoardsState } from "@/types/board";

export const boardReducer = (
  state: BoardsState,
  action: BoardsActions,
): BoardsState => {
  switch (action.type) {
    case "INITIALIZE_BOARDS": {
      const { boards } = action.payload;

      return {
        ...state,
        boards: [...boards],
      };
    }

    case "SET_ACTIVE_BOARD": {
      const { activeBoard } = action.payload;

      return { ...state, activeBoard };
    }

    case "CREATE_BOARD": {
      const { board } = action.payload;

      return {
        ...state,
        boards: [...state.boards, { ...board }],
      };
    }

    case "UPDATE_COLUMNS": {
      return state;
    }

    default:
      return state;
  }
};
