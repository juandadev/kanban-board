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

    case "UPDATE_COLUMNS": {
      // const { columns } = action.payload;
      //
      // const assignColumnsToBoard: Column[] = columns.map((column) => ({
      //   ...column,
      //   boardId: state.activeBoardId,
      // }));
      //
      // return {
      //   ...state,
      //   columns: [...state.columns, ...assignColumnsToBoard],
      // };
      return state;
    }

    case "UPDATE_BOARD_NAME": {
      // return {
      //   ...state,
      //   boards: state.boards.map((board) => {
      //     if (board.id !== state.activeBoardId) return board;
      //
      //     return {
      //       ...board,
      //       name: action.payload.name,
      //     };
      //   }),
      // };
      return state;
    }

    default:
      return state;
  }
};
