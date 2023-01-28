import React from 'react';
import DetailsPopUp from './DetailsPopUp';

const DetailsPopUpVM = (props) => {
  const { task } = props;

  if (Object.keys(task).length !== 0) {
    return <DetailsPopUp task={task} {...props} />;
  }

  return null;
};

export default DetailsPopUpVM;
