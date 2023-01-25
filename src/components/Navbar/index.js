import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import { boardsContext } from '../../context/boardContext';
import types from '../../context/types';
import withDimensions from '../../hocs';
import Navbar from './Navbar';

function NavbarVM(props) {
  const { state } = useContext(boardsContext);
  const { dispatch } = useContext(context);
  const [boardNames, setBoardNames] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const getTheme = localStorage.getItem('theme');

      dispatch({
        type: types.CHANGE_THEME,
        theme: getTheme
      });
    }
  }, []);

  useEffect(() => {
    const getBoardNames = state.boards.map((board) => ({ id: board.id, name: board.name }));

    setBoardNames(getBoardNames);
  }, [state.boards]);

  return <Navbar boardNames={boardNames} {...props} />;
}

export default withDimensions(NavbarVM);
