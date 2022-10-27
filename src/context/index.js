import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = { theme: 'light' };
const theme = createContext(initialState);
const { Provider } = theme;

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'CHANGE_THEME':
        return {
          theme: action.theme
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

export { theme, ContextProvider };
