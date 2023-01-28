import React, { useContext, useEffect, useState } from 'react';
import { boardsContext } from '../../context/boardContext';
import Main from './Main';

function MainVM(props) {
  const { state } = useContext(boardsContext);
  const { activeBoard: activeBoardIndex, boards } = state;
  const [activeBoard, setActiveBoard] = useState({});

  useEffect(() => {
    if (boards.length !== 0) {
      const getActiveBoard = boards.find((board) => board.id === activeBoardIndex);
      setActiveBoard(getActiveBoard);
    }
  }, [activeBoardIndex, boards]);

  return <Main activeBoard={activeBoard} {...props} />;
}

export default MainVM;
