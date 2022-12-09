import React from 'react';
import PropTypes from 'prop-types';
import s from './Subtask.module.scss';
import Icon from '../Icon/Icon';

export default function Subtask(props) {
  const {
    id,
    containerClassName = '',
    checkboxClassName = '',
    contentClassName = '',
    children = '',
    defaultChecked = false
  } = props;

  return (
    <div>
      <label className={`${s.container} ${containerClassName}`} htmlFor={`subtask-${id}`}>
        <input id={`subtask-${id}`} type="checkbox" defaultChecked={defaultChecked} />
        <p className={`${s.content} ${contentClassName}`}>{children}</p>
        <span className={`${s.checkmark} ${checkboxClassName}`} />
        <Icon icon="check" className={s.icon} />
      </label>
    </div>
  );
}

Subtask.propTypes = {
  id: PropTypes.number.isRequired,
  containerClassName: PropTypes.string,
  checkboxClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  defaultChecked: PropTypes.bool
};
