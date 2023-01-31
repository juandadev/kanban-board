import React, { createContext, useReducer } from 'react';

const initialState = {
  board: '',
  columns: [],
  tasks: [],
  subtasks: [],
  boardNames: [],
  activeBoardIdx: 0
};
const boardsContext = createContext(initialState);
const { Provider } = boardsContext;

function BoardsProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'INITIALIZE_BOARD': {
        const columns = action.board.columns.map((column) => column.name);
        const tasks = action.board.columns.reduce(
          (accumulator, current) => accumulator.concat(current.tasks),
          []
        );
        // TODO: Remove subtasks array if it isn't being used
        // const subtasks = tasks.reduce(
        //   (accumulator, current) => accumulator.concat(current.subtasks),
        //   []
        // );

        return {
          ...reducerState,
          board: action.board.name,
          columns,
          tasks
          // subtasks
        };
      }

      case 'SET_BOARD_NAMES':
        return {
          ...reducerState,
          boardNames: action.boardNames
        };

      case 'SELECT_BOARD':
        return {
          ...reducerState,
          activeBoardIdx: action.activeBoard
        };

      case 'TOGGLE_SUBTASK': {
        return { ...reducerState };
      }

      case 'CHANGE_TASK_COLUMN':
        return null;

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { boardsContext, BoardsProvider };
