import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import withDimensions from '../../hocs';
import Navbar from './Navbar';

function NavbarVM(props) {
  const { state, dispatch } = useContext(context);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const getTheme = localStorage.getItem('theme');

      dispatch({
        type: 'CHANGE_THEME',
        theme: getTheme
      });
    }
  }, []);

  useEffect(() => {
    const boardNames = state.boards.map((board) => board.name);

    setBoards(boardNames);
  }, [state]);

  return <Navbar boards={boards} {...props} />;
}

export default withDimensions(NavbarVM);
