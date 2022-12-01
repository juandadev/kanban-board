import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import Main from './Main';

function MainVM(props) {
  const { state } = useContext(context);
  const [activeBoard, setActiveBoard] = useState({});

  useEffect(() => {
    console.log('bar');
    setActiveBoard(state.activeBoard);
  }, [state]);

  return <Main activeBoard={activeBoard} {...props} />;
}

export default MainVM;
