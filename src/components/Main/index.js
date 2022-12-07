import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import Main from './Main';

function MainVM(props) {
  const { state } = useContext(context);
  const [activeBoard, setActiveBoard] = useState({});

  useEffect(() => {
    setActiveBoard(state.activeBoard);
  }, [state.activeBoard]);

  return <Main activeBoard={activeBoard} {...props} />;
}

export default MainVM;
