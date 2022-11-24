import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronUp({ className }) {
  return (
    <svg width={10} height={7} className={className}>
      <path stroke="#635FC7" strokeWidth={2} fill="none" d="M9 6 5 2 1 6" />
    </svg>
  );
}

ChevronUp.propTypes = {
  className: PropTypes.string
};

ChevronUp.defaultProps = {
  className: null
};
