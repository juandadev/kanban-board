import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { context } from '../../context';
import s from './Header.module.scss';

function Header({ containerClassName, isMobile }) {
  const { state, dispatch } = useContext(context);
  const isNavbarOpen = state.navbar;

  const handleClick = () => {
    const invertedValue = !isNavbarOpen;

    if (isMobile) {
      dispatch({
        type: 'TOGGLE_NAVBAR',
        navbar: invertedValue
      });
    }
  };

  return (
    <header
      className={`${s.container} ${containerClassName} ${!isNavbarOpen && s.containerPaddingOpen}`}>
      <span className={s.title} onClick={handleClick} aria-hidden>
        <Icon icon="logo-mobile" className={s.logo} />
        Platform Launch
        <Icon icon={isNavbarOpen ? 'chevron-up' : 'chevron-down'} className={s.chevron} />
      </span>
      <div className={s.actions}>
        <button type="button" className={s.button}>
          <Icon icon="add-task" className={s.addTaskIcon} />
          <span className={s.buttonText}>+ Add New Task</span>
        </button>
        <Icon icon="vertical-ellipsis" className={s.verticalEllipsisIcon} />
      </div>
    </header>
  );
}

Header.propTypes = {
  containerClassName: PropTypes.string,
  isMobile: PropTypes.bool
};

Header.defaultProps = {
  containerClassName: null,
  isMobile: false
};

export default Header;
