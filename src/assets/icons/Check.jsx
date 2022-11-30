import React from 'react';
import PropTypes from 'prop-types';

export default function Check({ className }) {
  return (
    <svg width={10} height={8} className={className}>
      <path stroke="#FFF" strokeWidth={2} fill="none" d="m1.276 3.066 2.756 2.756 5-5" />
    </svg>
  );
}

Check.propTypes = {
  className: PropTypes.string
};

Check.defaultProps = {
  className: null
};
