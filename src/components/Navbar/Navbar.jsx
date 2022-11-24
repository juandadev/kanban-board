import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../context';
import s from './Navbar.module.scss';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Icon from '../Icon/Icon';

export default function Navbar({ containerClassName }) {
  const { dispatch } = useContext(theme);
  const [defaultTheme, setDefaultTheme] = useState('light');

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const getTheme = JSON.stringify(localStorage.getItem('theme'));

      setDefaultTheme(getTheme);
    }
  }, []);

  const handleClick = (isChecked) => {
    const targetTheme = isChecked ? 'dark' : 'light';

    dispatch({
      type: 'CHANGE_THEME',
      theme: targetTheme
    });
  };

  return (
    <>
      <nav className={`${s.container} ${containerClassName}`}>
        <span className={s.title}>All Boards (3)</span>
        <div className={s.boardContainer}>
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
        <div className={s.themeSwitcher}>
          <Icon icon="light-theme" />
          <ToggleSwitch onClick={handleClick} defaultChecked={defaultTheme === 'dark'} />
          <Icon icon="dark-theme" />
        </div>
      </nav>
      <div className={s.overlay} />
    </>
  );
}

Navbar.propTypes = {
  containerClassName: PropTypes.string
};

Navbar.defaultProps = {
  containerClassName: null
};
