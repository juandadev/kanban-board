import React, { useContext, useEffect, useState } from 'react';
import { boardsContext } from '../../context/boardContext';
import withDimensions from '../../hocs';
import Header from './Header';

function HeaderVM(props) {
  const { state } = useContext(boardsContext);
  const [activeBoardName, setActiveBoardName] = useState('');

  useEffect(() => {
    setActiveBoardName(state.activeBoard.name);
  }, [state.activeBoard.name]);

  return <Header activeBoardName={activeBoardName} {...props} />;
}

export default withDimensions(HeaderVM);
