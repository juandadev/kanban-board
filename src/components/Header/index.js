import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../context';
import withDimensions from '../../hocs';
import Header from './Header';

function HeaderVM(props) {
  const { state } = useContext(context);
  const [activeBoardName, setActiveBoardName] = useState('');

  useEffect(() => {
    setActiveBoardName(state.activeBoard.name);
  }, [state]);

  return <Header activeBoardName={activeBoardName} {...props} />;
}

export default withDimensions(HeaderVM);
