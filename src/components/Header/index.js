import React from 'react';
import withDimensions from '../../hocs';
import Header from './Header';

function HeaderVM(props) {
  return <Header {...props} />;
}

export default withDimensions(HeaderVM);
