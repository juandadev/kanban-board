import React, { createContext, useReducer } from 'react';
import BoardManager from '../helpers/BoardManager';

const initialState = {
  boards: [],
  activeBoard: 1
};
const boardsContext = createContext(initialState);
const { Provider } = boardsContext;

function BoardsProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    const boardManager = new BoardManager(reducerState, action);

    switch (action.type) {
      case 'INITIALIZE_BOARDS':
        return {
          ...reducerState,
          boards: action.boards
        };

      case 'SELECT_BOARD':
        return {
          ...reducerState,
          activeBoard: action.activeBoard
        };

      case 'TOGGLE_SUBTASK': {
        const newBoards = boardManager.editBoard('subtask');

        return {
          ...reducerState,
          boards: newBoards
        };
      }

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { boardsContext, BoardsProvider };
