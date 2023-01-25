import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import { boardsContext } from '../../context/boardContext';
import types from '../../context/types';
import withDimensions from '../../hocs';
import Navbar from './Navbar';

function NavbarVM(props) {
  const { state } = useContext(boardsContext);
  const { dispatch } = useContext(context);
  const [boards, setBoards] = useState([]);

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
    const boardNames = state.boards.map((board) => board.name);

    setBoards(boardNames);
  }, [state.boards]);

  return <Navbar boards={boards} {...props} />;
}

export default withDimensions(NavbarVM);
