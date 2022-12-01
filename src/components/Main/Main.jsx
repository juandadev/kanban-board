import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import s from './Main.module.scss';

export default function Main({ containerClassName }) {
  return (
    <main className={`${s.container} ${containerClassName}`}>
      <p className={s.text}>This board is empty. Create a new column to get started.</p>
      <Button type="primary" size="large">
        + Add New Column
      </Button>
    </main>
  );
}

Main.propTypes = {
  containerClassName: PropTypes.string
};

Main.defaultProps = {
  containerClassName: null
};
