import React, { useContext, useEffect } from 'react';
import { context } from '../../context';
import { boardsContext } from '../../context/boardContext';
import types from '../../context/types';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Icon from '../Icon/Icon';
import s from './Navbar.module.scss';

export default function Navbar({ containerClassName = '', isMobile = false, boardNames = [] }) {
  const { state, dispatch } = useContext(context);
  const { state: boardState, dispatch: boardDispatch } = useContext(boardsContext);
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

  const handleActiveBoard = (boardId) => {
    boardDispatch({
      type: types.SELECT_BOARD,
      activeBoard: boardId
    });

    if (isMobile) {
      dispatch({
        type: types.TOGGLE_NAVBAR,
        isNavbarOpen: false
      });
    }
  };

  const renderBoardNames = () => {
    const { activeBoard } = boardState;

    return boardNames.map((board) => (
      <li
        key={`board-name-${board.name.trim().toLowerCase()}`}
        className={`${s.boardListItem} ${activeBoard === board.id && s.selected}`}
        onClick={() => handleActiveBoard(board.id)}
        aria-hidden>
        <Icon icon="board" className={s.boardIcon} />
        <p>{board.name}</p>
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
