import React from 'react';
import PropTypes from 'prop-types';
import {
  VerticalEllipsis,
  AddTask,
  LogoMobile,
  ChevronUp,
  ChevronDown,
  LogoLight,
  LogoDark,
  LightTheme,
  DarkTheme,
  Board,
  HideSidebar,
  ShowSidebar,
  Cross,
  Check
} from '../../assets/icons';

const svgList = {
  'vertical-ellipsis': VerticalEllipsis,
  'add-task': AddTask,
  'logo-mobile': LogoMobile,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'logo-light': LogoLight,
  'light-theme': LightTheme,
  'dark-theme': DarkTheme,
  'hide-sidebar': HideSidebar,
  'show-sidebar': ShowSidebar,
  'logo-dark': LogoDark,
  cross: Cross,
  check: Check,
  board: Board
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
