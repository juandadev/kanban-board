import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './TextField.module.scss';

export default function TextField(props) {
  const {
    containerClassName,
    fieldClassName,
    placeholder,
    error,
    helperText,
    label,
    value,
    onChange
  } = props;
  const [fieldValue, setFieldValue] = useState();

  useEffect(() => {
    if (value && value !== '') {
      setFieldValue(value);
    }
  }, []);

  const handleChange = (event) => {
    const inputValue = event?.target?.value;

    setFieldValue(inputValue);

    if (onChange && typeof onChange === 'function') {
      onChange(inputValue);
    }
  };

  return (
    <label htmlFor="textField" className={`${s.container} ${containerClassName}`}>
      {label && label !== '' && <p className={s.label}>{label}</p>}
      <input
        id="textField"
        type="text"
        value={fieldValue}
        onChange={handleChange}
        className={`${fieldClassName} ${s.field} ${error && s.error}`}
        placeholder={placeholder}
      />
      {((helperText && helperText !== '') || error) && (
        <span className={`${s.helperText} ${error && s.textError}`}>
          {error ? "Can't be empty" : helperText}
        </span>
      )}
    </label>
  );
}

TextField.propTypes = {
  fieldClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextField.defaultProps = {
  fieldClassName: null,
  containerClassName: null,
  placeholder: '',
  error: false,
  helperText: null,
  label: null,
  value: '',
  onChange: null
};
