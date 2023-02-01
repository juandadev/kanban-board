import React, { useContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { context } from '../../context';
import types from '../../context/types';
import Button from '../Button/Button';
import s from './Header.module.scss';
import NewTaskModal from '../NewTaskModal/NewTaskModal';

const Header = ({ containerClassName, isMobile, activeBoardName }) => {
  const [newTaskModal, setNewTaskModal] = useState(false);
  const { state, dispatch } = useContext(context);
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

  const handleNewTaskModal = () => {
    setNewTaskModal((prevState) => !prevState);
  };

  return (
    <>
      <header
        className={`${s.container} ${containerClassName} ${
          !isNavbarOpen && s.containerPaddingOpen
        }`}>
        <span className={s.title} onClick={handleClick} ref={ref} aria-hidden>
          <Icon icon="logo-mobile" className={s.logo} />
          {activeBoardName}
          <Icon icon={isNavbarOpen ? 'chevron-up' : 'chevron-down'} className={s.chevron} />
        </span>
        <div className={s.actions}>
          <Button type="primary" size="large" className={s.button}>
            <Icon icon="add-task" className={s.addTaskIcon} />
            <span className={s.buttonText} onClick={handleNewTaskModal} aria-hidden>
              + Add New Task
            </span>
          </Button>
          <Icon icon="vertical-ellipsis" className={s.verticalEllipsisIcon} />
        </div>
      </header>
      <NewTaskModal isModalOpen={newTaskModal} onModalClose={handleNewTaskModal} />
    </>
  );
};

Header.propTypes = {
  containerClassName: PropTypes.string,
  isMobile: PropTypes.bool,
  activeBoardName: PropTypes.string
};

Header.defaultProps = {
  containerClassName: null,
  isMobile: false,
  activeBoardName: ''
};

export default Header;
