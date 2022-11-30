import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './Dropdown.module.scss';
import Icon from '../Icon/Icon';

export default function Dropdown(props) {
  const { label, options, onChange, containerClassName } = props;
  const [dropdownClosed, setDropdownClosed] = useState(true);
  const [optionSelected, setOptionSelected] = useState({ label: '', value: '' });

  useEffect(() => {
    setOptionSelected(options[0]);
  }, []);

  const handleClick = () => {
    setDropdownClosed((state) => !state);
  };

  const handleOption = (index) => {
    setOptionSelected(options[index]);
    setDropdownClosed(true);

    if (onChange && typeof onChange === 'function') {
      onChange(options[index].value);
    }
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <span
        key={`option-${option.value}`}
        className={s.option}
        onClick={() => handleOption(index)}
        aria-hidden>
        {option.label}
      </span>
    ));
  };

  return (
    <div className={`${s.container} ${containerClassName}`}>
      {label && label !== '' && (
        <span className={`${s.label}`}>
          <span>{label}</span>
        </span>
      )}
      <span
        className={`${s.field} ${!dropdownClosed && s.fieldActive}`}
        onClick={handleClick}
        aria-hidden>
        <span>{optionSelected.label}</span>
        <Icon icon="chevron-down" className={s.icon} />
      </span>
      <div
        className={`${s.optionsContainer} ${label && label !== '' && s.optionsWithLabel} ${
          dropdownClosed && s.closed
        }`}>
        {renderOptions()}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func,
  containerClassName: PropTypes.string
};

Dropdown.defaultProps = {
  label: null,
  onChange: null,
  containerClassName: null
};
