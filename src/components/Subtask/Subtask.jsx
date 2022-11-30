import React from 'react';
import PropTypes from 'prop-types';
import s from './Subtask.module.scss';
import Icon from '../Icon/Icon';

export default function Subtask(props) {
  const { containerClassName, checkboxClassName, contentClassName, children } = props;

  return (
    <div>
      <label className={`${s.container} ${containerClassName}`} htmlFor="subtask">
        <input id="subtask" type="checkbox" />
        <p className={`${s.content} ${contentClassName}`}>{children}</p>
        <span className={`${s.checkmark} ${checkboxClassName}`} />
        <Icon icon="check" className={s.icon} />
      </label>
    </div>
  );
}

Subtask.propTypes = {
  containerClassName: PropTypes.string,
  checkboxClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Subtask.defaultProps = {
  containerClassName: null,
  checkboxClassName: null,
  contentClassName: null,
  children: ''
};
