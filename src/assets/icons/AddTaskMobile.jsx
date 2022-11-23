import React from 'react';
import PropTypes from 'prop-types';

export default function AddTaskMobile({ className }) {
  return (
    <svg width={12} height={12} className={className}>
      <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
    </svg>
  );
}

AddTaskMobile.propTypes = {
  className: PropTypes.string
};

AddTaskMobile.defaultProps = {
  className: null
};
