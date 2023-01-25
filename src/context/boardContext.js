import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  boards: [],
  activeBoard: {}
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

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

BoardsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { boardsContext, BoardsProvider };
