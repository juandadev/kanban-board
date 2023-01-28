import React from 'react';
import s from './Subtask.module.scss';
import Icon from '../Icon/Icon';

export default function Subtask(props) {
  const {
    id,
    containerClassName = '',
    checkboxClassName = '',
    contentClassName = '',
    children = '',
    defaultChecked = false,
    onChange = () => {},
    ...passThroughProps
  } = props;

  return (
    <div>
      <label className={`${s.container} ${containerClassName}`} htmlFor={`subtask-${id}`}>
        <input
          id={`subtask-${id}`}
          type="checkbox"
          defaultChecked={defaultChecked}
          onChange={onChange}
          {...passThroughProps}
        />
        <p className={`${s.content} ${contentClassName}`}>{children}</p>
        <span className={`${s.checkmark} ${checkboxClassName}`} />
        <Icon icon="check" className={s.icon} />
      </label>
    </div>
  );
}
