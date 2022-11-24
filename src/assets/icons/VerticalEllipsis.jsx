import React from 'react';
import PropTypes from 'prop-types';

export default function VerticalEllipsis({ className }) {
  return (
    <svg width={5} height={20} className={className}>
      <g fill="#828FA3" fillRule="evenodd">
        <circle cx="2.308" cy="2.308" r="2.308" />
        <circle cx="2.308" cy={10} r="2.308" />
        <circle cx="2.308" cy="17.692" r="2.308" />
      </g>
    </svg>
  );
}

VerticalEllipsis.propTypes = {
  className: PropTypes.string
};

VerticalEllipsis.defaultProps = {
  className: null
};
