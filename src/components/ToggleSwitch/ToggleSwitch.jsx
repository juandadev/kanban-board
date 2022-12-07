import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './ToggleSwitch.module.scss';

export default function ToggleSwitch({ onClick, defaultChecked }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);

    if (onClick) {
      onClick(!isChecked);
    }
  };

  return (
    <label className={s.switch} htmlFor="toggleSwitch" aria-hidden>
      <input type="checkbox" id="toggleSwitch" checked={isChecked} onChange={handleChange} />
      <span className={s.slider} />
    </label>
  );
}

ToggleSwitch.propTypes = {
  onClick: PropTypes.func,
  defaultChecked: PropTypes.bool
};

ToggleSwitch.defaultProps = {
  onClick: null,
  defaultChecked: false
};
