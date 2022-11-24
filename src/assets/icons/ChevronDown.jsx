import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronDown({ className }) {
  return (
    <svg width={10} height={7} className={className}>
      <path stroke="#635FC7" strokeWidth={2} fill="none" d="m1 1 4 4 4-4" />
    </svg>
  );
}

ChevronDown.propTypes = {
  className: PropTypes.string
};

ChevronDown.defaultProps = {
  className: null
};
