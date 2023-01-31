import React, { useContext } from 'react';
import { boardsContext } from '../../context/boardContext';
import withDimensions from '../../hocs';
import Header from './Header';

function HeaderVM(props) {
  const { state } = useContext(boardsContext);
  const { board } = state;

  return <Header activeBoardName={board.name} {...props} />;
}

export default withDimensions(HeaderVM);
