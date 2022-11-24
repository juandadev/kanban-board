import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import { context } from '../context';
import s from './App.module.scss';

function App() {
  const { state } = useContext(context);

  return (
    <div className={`${state.theme === 'dark' && 'dark-theme'} app`}>
      <div className={`container ${s.dashboard}`}>
        <Header containerClassName={s.header} />
        <Navbar containerClassName={s.nav} />
        <main className={s.container}>Something</main>
      </div>
    </div>
  );
}

export default App;
