import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { context } from '../../context';
import types from '../../context/types';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Icon from '../Icon/Icon';
import s from './Navbar.module.scss';

export default function Navbar({ containerClassName, isMobile, boards }) {
  const { state, dispatch } = useContext(context);
  const isLightTheme = state.theme === 'light';
  const { isNavbarOpen } = state;

  useEffect(() => {
    if (!isMobile) {
      dispatch({
        type: types.TOGGLE_NAVBAR,
        isNavbarOpen: true
      });
    }
  }, [isMobile]);

  const handleTheme = (isChecked) => {
    const targetTheme = isChecked ? 'dark' : 'light';

    dispatch({
      type: types.CHANGE_THEME,
      theme: targetTheme
    });

    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
      localStorage.setItem('theme', targetTheme);
    } else {
      localStorage.setItem('theme', targetTheme);
    }
  };

  const handleNavbar = () => {
    const invertedValue = !state.isNavbarOpen;

    dispatch({
      type: types.TOGGLE_NAVBAR,
      isNavbarOpen: invertedValue
    });
  };

  const handleActiveBoard = (boardName) => {
    const selectedBoard = state.boards.filter((board) => board.name === boardName);

    dispatch({
      type: types.SELECT_BOARD,
      activeBoard: selectedBoard[0]
    });

    if (isMobile) {
      dispatch({
        type: types.TOGGLE_NAVBAR,
        isNavbarOpen: false
      });
    }
  };

  const renderBoardNames = () => {
    const selectedBoard = state.activeBoard;

    return boards.map((board) => (
      <li
        key={`board-name-${board.trim().toLowerCase()}`}
        className={`${s.boardListItem} ${selectedBoard.name === board && s.selected}`}
        onClick={() => handleActiveBoard(board)}
        aria-hidden>
        <Icon icon="board" className={s.boardIcon} />
        <p>{board}</p>
      </li>
    ));
  };

  return (
    <>
      {!isMobile && (
        <div className={`${s.logoContainer} ${!isNavbarOpen && s.logoClose}`}>
          <Icon icon={isLightTheme ? 'logo-dark' : 'logo-light'} className={s.logo} />
        </div>
      )}
      <nav
        className={`${isNavbarOpen ? s.modalShow : s.modalClose} ${
          s.container
        } ${containerClassName} ${isNavbarOpen ? s.showAnimation : s.hideAnimation}`}>
        <div className={s.boardContainer}>
          <span className={s.title}>All Boards (3)</span>
          <ul className={s.boardList}>
            {renderBoardNames()}
            <li className={`${s.boardListItem} ${s.create}`}>
              <Icon icon="board" className={s.boardIcon} />
              <p>+ Create New Board</p>
            </li>
          </ul>
        </div>
        <div className={s.footerNav}>
          <div className={s.themeSwitcher}>
            <Icon icon="light-theme" />
            <ToggleSwitch onClick={handleTheme} defaultChecked={state.theme === 'dark'} />
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
      <div
        className={`${isNavbarOpen ? s.overlayShow : s.overlayClose} ${s.overlay}`}
        onClick={handleNavbar}
        aria-hidden
      />
    </>
  );
}

Navbar.propTypes = {
  containerClassName: PropTypes.string,
  isMobile: PropTypes.bool,
  boards: PropTypes.arrayOf(PropTypes.string)
};

Navbar.defaultProps = {
  containerClassName: null,
  isMobile: false,
  boards: []
};
