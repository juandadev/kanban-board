import React, { useContext, useEffect } from 'react';
import { context } from '../context';
import App from './App';

function AppVM(props) {
  const { dispatch } = useContext(context);

  const setBoards = async () =>
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({ type: 'INITIALIZE_BOARDS', boards: jsonResponse.boards });

        if (jsonResponse.boards.length !== 0) {
          dispatch({ type: 'SELECT_BOARD', activeBoard: jsonResponse.boards[0] });
        }
      });

  useEffect(() => {
    setBoards();
  }, []);

  return <App {...props} />;
}

export default AppVM;
