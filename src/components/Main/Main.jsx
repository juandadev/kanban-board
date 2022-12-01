import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import s from './Main.module.scss';

export default function Main({ containerClassName, activeBoard }) {
  return (
    <main className={`${s.container} ${containerClassName}`}>
      {Object.keys(activeBoard).length === 0 ? (
        <>
          <p className={s.text}>This board is empty. Create a new column to get started.</p>
          <Button type="primary" size="large">
            + Add New Column
          </Button>
        </>
      ) : (
        <h1>{activeBoard.name}</h1>
      )}
    </main>
  );
}

Main.propTypes = {
  containerClassName: PropTypes.string,
  activeBoard: PropTypes.shape()
};

Main.defaultProps = {
  containerClassName: null,
  activeBoard: null
};
