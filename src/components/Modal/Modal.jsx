import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

export default function Modal({ children = null, isModalOpen, onModalClose }) {
  const handleModalClose = () => {
    onModalClose();
  };

  if (isModalOpen) {
    return (
      <>
        <div className={s.modal}>{children}</div>
        <div className={s.overlay} onClick={handleModalClose} aria-hidden />
      </>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};
