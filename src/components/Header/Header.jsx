import React, { useContext, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import { context } from '../../context';
import { boardsContext } from '../../context/boardContext';
import types from '../../context/types';
import Button from '../Button/Button';
import s from './Header.module.scss';

const Header = ({ containerClassName = '', isMobile = false }) => {
  const { state, dispatch } = useContext(context);
  const { state: boardsState } = useContext(boardsContext);
  const { isNavbarOpen } = state;
  const ref = useRef();

  useEffect(() => {
    dispatch({
      type: types.SET_REF,
      headerRef: ref
    });
  }, []);

  const handleClick = () => {
    const invertedValue = !state.isNavbarOpen;

    if (isMobile) {
      dispatch({
        type: types.TOGGLE_NAVBAR,
        isNavbarOpen: invertedValue
      });
    }
  };

  return (
    <header
      className={`${s.container} ${containerClassName} ${!isNavbarOpen && s.containerPaddingOpen}`}>
      <span className={s.title} onClick={handleClick} ref={ref} aria-hidden>
        <Icon icon="logo-mobile" className={s.logo} />
        {boardsState.board}
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

export default Header;
