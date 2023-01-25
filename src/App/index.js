import React, { useCallback, useContext, useEffect } from 'react';
import { boardsContext } from '../context/boardContext';
import App from './App';

const AppVM = (props) => {
  const { dispatch } = useContext(boardsContext);

  const setBoards = useCallback(
    async () =>
      fetch('data.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          dispatch({ type: 'INITIALIZE_BOARDS', boards: jsonResponse.boards });

          // TODO: Store board index in localStorage to remember the last board selected by the user and load it at the beginning
          // if (jsonResponse.boards.length !== 0) {
          //   dispatch({ type: 'SELECT_BOARD', activeBoard: 0 });
          // }
        }),
    []
  );

  useEffect(() => {
    setBoards();
  }, [setBoards]);

  return <App {...props} />;
};

export default AppVM;
