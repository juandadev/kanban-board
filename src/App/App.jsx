import React, { useContext } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header';
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
        <main className={s.container}>
          <Button type="primary" size="large">
            Button Primary (L)
          </Button>
          <Button type="primary" size="small">
            Button Primary (S)
          </Button>
          <Button type="secondary" size="large">
            Button Secondary (L)
          </Button>
          <Button type="danger" size="large">
            Button Desctructive (L)
          </Button>
          <Button type="primary" size="large" fluid>
            Button Fluid (L)
          </Button>
        </main>
      </div>
    </div>
  );
}

export default App;
