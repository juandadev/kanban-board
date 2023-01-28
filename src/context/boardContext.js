import React, { createContext, useReducer } from 'react';

const initialState = {
  boards: [],
  activeBoard: 1
};
const boardsContext = createContext(initialState);
const { Provider } = boardsContext;

function BoardsProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
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

      case 'TOGGLE_SUBTASK':
        return {
          ...reducerState
        };

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { boardsContext, BoardsProvider };
