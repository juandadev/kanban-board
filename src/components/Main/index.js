import React, { useContext, useEffect, useState } from 'react';
import { boardsContext } from '../../context/boardContext';
import Main from './Main';

function MainVM(props) {
  const { state } = useContext(boardsContext);
  const [activeBoard, setActiveBoard] = useState({});

  useEffect(() => {
    setActiveBoard(state.activeBoard);
  }, [state.activeBoard]);

  return <Main activeBoard={activeBoard} {...props} />;
}

export default MainVM;
