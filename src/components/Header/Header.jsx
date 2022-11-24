import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import s from './Header.module.scss';

function Header({ containerClassName }) {
  return (
    <header className={`${s.container} ${containerClassName}`}>
      <h1 className={s.title}>Platform Launch</h1>
      <div className={s.actions}>
        <button type="button" className={s.button}>
          <Icon icon="add-task" className={s.addTaskIcon} />
          Add New Task
        </button>
        <Icon icon="vertical-ellipsis" className={s.verticalEllipsisIcon} />
      </div>
    </header>
  );
}

Header.propTypes = {
  containerClassName: PropTypes.string
};

Header.defaultProps = {
  containerClassName: null
};

export default Header;
