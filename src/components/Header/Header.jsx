import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import s from './Header.module.scss';

function Header({ containerClassName }) {
  return (
    <header className={containerClassName}>
      <h1>Platform Launch</h1>
      <button type="button">
        <Icon icon="add-task" className={s.addTaskIcon} />
        Add New Task
      </button>
      <Icon icon="vertical-ellipsis" className={s.verticalEllipsisIcon} />
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
