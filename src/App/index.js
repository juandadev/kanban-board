import React, { useCallback, useContext, useEffect } from 'react';
import { boardsContext } from '../context/boardContext';
import types from '../context/types';
import App from './App';

const AppVM = (props) => {
  const { state, dispatch } = useContext(boardsContext);

  const setBoard = useCallback(
    async () =>
      fetch('data.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          dispatch({
            type: types.INITIALIZE_BOARD,
            board: jsonResponse.boards[state.activeBoardIdx]
          });
          dispatch({
            type: types.SET_BOARD_NAMES,
            boardNames: jsonResponse.boards.map((board) => board.name)
          });

          // TODO: Store board index in localStorage to remember the last board selected by the user and load it at the beginning
        }),
    [state.activeBoardIdx]
  );

  useEffect(() => {
    setBoard();
  }, [state.activeBoardIdx]);

  return <App {...props} />;
};

export default AppVM;
