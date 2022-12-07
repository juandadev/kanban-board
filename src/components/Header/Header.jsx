import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { context } from '../../context';
import Button from '../Button/Button';
import s from './Header.module.scss';

const Header = ({ containerClassName, isMobile, activeBoardName }) => {
  const { state, dispatch } = useContext(context);
  const isNavbarOpen = state.navbar;

  const handleClick = () => {
    if (isMobile && !isNavbarOpen) {
      dispatch({
        type: 'TOGGLE_NAVBAR',
        navbar: true
      });
    }
  };

  return (
    <header
      className={`${s.container} ${containerClassName} ${!isNavbarOpen && s.containerPaddingOpen}`}>
      <span className={s.title} onClick={handleClick} aria-hidden>
        <Icon icon="logo-mobile" className={s.logo} />
        {activeBoardName}
        <Icon icon={isNavbarOpen ? 'chevron-up' : 'chevron-down'} className={s.chevron} />
      </span>
      <div className={s.actions}>
        <Button type="primary" size="large" className={s.button}>
          <Icon icon="add-task" className={s.addTaskIcon} />
          <span className={s.buttonText}>+ Add New Task</span>
        </Button>
        <Icon icon="vertical-ellipsis" className={s.verticalEllipsisIcon} />
      </div>
    </header>
  );
};

Header.propTypes = {
  containerClassName: PropTypes.string,
  isMobile: PropTypes.bool,
  activeBoardName: PropTypes.string
};

Header.defaultProps = {
  containerClassName: null,
  isMobile: false,
  activeBoardName: ''
};

export default Header;
