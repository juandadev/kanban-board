import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button(props) {
  const { children, className, onClick, type, size, fluid } = props;

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`${className} ${s.button} ${s[type]} ${s[size]} ${fluid && s.fluid}`}
      onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'large']),
  fluid: PropTypes.bool
};

Button.defaultProps = {
  children: '',
  className: null,
  onClick: null,
  type: 'primary',
  size: 'large',
  fluid: false
};
