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
      .then((jsonResponse) => dispatch({ type: 'INITIALIZE_BOARDS', boards: jsonResponse.boards }));

  useEffect(() => {
    setBoards();
  }, []);

  return <App {...props} />;
}

export default AppVM;
