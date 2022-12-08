import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  theme: 'light',
  navbar: false,
  boards: [],
  activeBoard: {},
  headerRef: null
};
const context = createContext(initialState);
const { Provider } = context;

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'CHANGE_THEME':
        return {
          ...reducerState,
          theme: action.theme
        };

      case 'TOGGLE_NAVBAR':
        return {
          ...reducerState,
          navbar: action.navbar
        };

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

      case 'SET_REF':
        return {
          ...reducerState,
          headerRef: action.headerRef
        };

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { context, ContextProvider };
