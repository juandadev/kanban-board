import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

export default function Modal({ children = null }) {
  return (
    <>
      <div className={s.modal}>{children}</div>
      <div className={s.overlay} />
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node
};
