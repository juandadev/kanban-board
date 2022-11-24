import React from 'react';
import PropTypes from 'prop-types';

export default function LogoMobile({ className }) {
  return (
    <svg width={24} height={25} className={className}>
      <g fill="#635FC7" fillRule="evenodd">
        <rect width={6} height={25} rx={2} />
        <rect opacity=".75" x={9} width={6} height={25} rx={2} />
        <rect opacity=".5" x={18} width={6} height={25} rx={2} />
      </g>
    </svg>
  );
}

LogoMobile.propTypes = {
  className: PropTypes.string
};

LogoMobile.defaultProps = {
  className: null
};
