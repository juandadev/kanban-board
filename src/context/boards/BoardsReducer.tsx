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

    case "CREATE_BOARD": {
      const { name } = action.payload;

      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: Date.now().toString(),
            name,
            user_id: "",
            work_schedule: null,
            created_at: undefined,
            updated_at: undefined,
          },
        ],
      };
    }

    case "UPDATE_COLUMNS": {
      return state;
    }

    default:
      return state;
  }
};
