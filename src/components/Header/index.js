import React, { useContext, useEffect, useState } from 'react';
import { boardsContext } from '../../context/boardContext';
import withDimensions from '../../hocs';
import Header from './Header';

function HeaderVM(props) {
  const { state } = useContext(boardsContext);
  const { activeBoard, boards } = state;
  const [activeBoardName, setActiveBoardName] = useState('');

  useEffect(() => {
    if (boards.length !== 0) {
      const findActiveBoardName = boards.find((board) => board.id === activeBoard);
      setActiveBoardName(findActiveBoardName.name);
    }
  }, [boards, activeBoard]);

  return <Header activeBoardName={activeBoardName} {...props} />;
}

export default withDimensions(HeaderVM);
