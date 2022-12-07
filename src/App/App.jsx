import React, { useContext } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import { context } from '../context';
import s from './App.module.scss';

function App() {
  const { state } = useContext(context);
  const isNavbarOpen = state.navbar;

  return (
    <div className={`${state.theme === 'dark' && 'dark-theme'} app`}>
      <div className={`container ${s.dashboard} ${!isNavbarOpen && s.hiddenNavbar}`}>
        <Header containerClassName={s.header} />
        <Navbar containerClassName={s.nav} />
        <Main containerClassName={s.container} />
      </div>
    </div>
  );
}

export default App;
