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
      <div className="container">
        <Header />
        <div className={s.container}>Something</div>
        <button type="button" data-theme="light" onClick={handleTheme}>
          Light
        </button>
        <button type="button" data-theme="dark" onClick={handleTheme}>
          Dark
        </button>
      </div>
    </div>
  );
}

export default App;
