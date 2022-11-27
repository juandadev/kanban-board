import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { context } from '../../context';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Icon from '../Icon/Icon';
import s from './Navbar.module.scss';

export default function Navbar({ containerClassName, isMobile }) {
  const [defaultTheme, setDefaultTheme] = useState('light');
  const { state, dispatch } = useContext(context);
  const isLightTheme = state.theme === 'light';
  const isNavbarOpen = state.navbar;

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const getTheme = JSON.stringify(localStorage.getItem('theme'));
      setDefaultTheme(getTheme);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      dispatch({
        type: 'TOGGLE_NAVBAR',
        navbar: true
      });
    }
  }, [isMobile]);

  const handleClick = (isChecked) => {
    const targetTheme = isChecked ? 'dark' : 'light';

    dispatch({
      type: 'CHANGE_THEME',
      theme: targetTheme
    });
  };

  const handleNavbar = () => {
    dispatch({
      type: 'TOGGLE_NAVBAR',
      navbar: !state.navbar
    });
  };

  return (
    <>
      <nav
        className={`${isNavbarOpen ? s.modalShow : s.modalClose} ${
          s.container
        } ${containerClassName} ${isNavbarOpen ? s.showAnimation : s.hideAnimation}`}>
        <div className={s.boardContainer}>
          {!isMobile && (
            <Icon icon={isLightTheme ? 'logo-dark' : 'logo-light'} className={s.logo} />
          )}
          <span className={s.title}>All Boards (3)</span>
          <ul className={s.boardList}>
            <li className={`${s.boardListItem} ${s.selected}`}>
              <Icon icon="board" className={s.boardIcon} />
              <p>Platform Launch</p>
            </li>
            <li className={`${s.boardListItem}`}>
              <Icon icon="board" className={s.boardIcon} />
              <p>Marketing Plan</p>
            </li>
            <li className={`${s.boardListItem}`}>
              <Icon icon="board" className={s.boardIcon} />
              <p>Roadmap</p>
            </li>
            <li className={`${s.boardListItem} ${s.create}`}>
              <Icon icon="board" className={s.boardIcon} />
              <p>+ Create New Board</p>
            </li>
          </ul>
        </div>
        <div className={s.footerNav}>
          <div className={s.themeSwitcher}>
            <Icon icon="light-theme" />
            <ToggleSwitch onClick={handleClick} defaultChecked={defaultTheme === 'dark'} />
            <Icon icon="dark-theme" />
          </div>
          {!isMobile && (
            <span className={s.hideNav} onClick={handleNavbar} aria-hidden>
              <Icon icon="hide-sidebar" className={s.hideNavIcon} />
              Hide Sidebar
            </span>
          )}
        </div>
      </nav>
      {!isMobile && (
        <div
          className={`${s.showNav} ${!isNavbarOpen ? s.showAnimation : s.hideAnimation}`}
          onClick={handleNavbar}
          aria-hidden>
          <Icon icon="show-sidebar" />
        </div>
      )}
      <div className={`${isNavbarOpen ? s.overlayShow : s.overlayClose} ${s.overlay}`} />
    </>
  );
}

Navbar.propTypes = {
  containerClassName: PropTypes.string,
  isMobile: PropTypes.bool
};

Navbar.defaultProps = {
  containerClassName: null,
  isMobile: false
};
