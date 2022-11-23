import React from 'react';
import PropTypes from 'prop-types';
import { VerticalEllipsis, AddTask } from '../../assets/icons';

const svgList = {
  'vertical-ellipsis': VerticalEllipsis,
  'add-task': AddTask
};

export default function Icon({ icon, className }) {
  const SVG = svgList[icon];

  return <SVG className={className} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string
};

Icon.defaultProps = {
  className: null
};
