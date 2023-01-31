import React, { useContext, useEffect, useState } from 'react';
import { boardsContext } from '../../context/boardContext';
import Main from './Main';

function MainVM(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(boardsContext);
  const { board, columns, tasks } = state;

  useEffect(() => {
    if (Object.keys(board) !== 0 && columns.length !== 0 && tasks.length !== 0) {
      setIsLoading(false);
    }
  }, [state]);

  return <Main isLoading={isLoading} {...props} />;
}

export default MainVM;
