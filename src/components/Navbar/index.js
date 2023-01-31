import React, { useContext, useEffect } from 'react';
import { context } from '../../context';
import { boardsContext } from '../../context/boardContext';
import types from '../../context/types';
import withDimensions from '../../hocs';
import Navbar from './Navbar';

function NavbarVM(props) {
  const { state } = useContext(boardsContext);
  const { dispatch } = useContext(context);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const getTheme = localStorage.getItem('theme');

      dispatch({
        type: types.CHANGE_THEME,
        theme: getTheme
      });
    }
  }, []);

  return <Navbar boardNames={state.boardNames} {...props} />;
}

export default withDimensions(NavbarVM);
