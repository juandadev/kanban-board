import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import { theme } from '../context';
import s from './App.module.scss';

function App() {
  const { state, dispatch } = useContext(theme);

  const handleTheme = (event) => {
    const { theme: targetTheme } = event.target.dataset;

    dispatch({
      type: 'CHANGE_THEME',
      theme: targetTheme
    });
  };

  return (
    <div className={`${state.theme === 'dark' && 'dark-theme'} app`}>
      <div className={`container ${s.dashboard}`}>
        <Header containerClassName={s.header} />
        <main className={s.container}>Something</main>
        <nav className={s.nav}>
          <button type="button" data-theme="light" onClick={handleTheme}>
            Light
          </button>
          <button type="button" data-theme="dark" onClick={handleTheme}>
            Dark
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
