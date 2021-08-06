/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

function getBool(val) {
  return !!JSON.parse(String(val).toLowerCase());
}

export const AddGoodInput = ({
  inputType, inputName, value, onChange, placeholder, isRequired, isValid,
}) => (
  <div>
    <label>
      <span>{inputName}</span>
      <input
        type={inputType}
        name={inputName}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={getBool(isRequired)}
        className={classNames('form-control', {
          'is-valid': isValid,
          'is-invalid': !isValid && isValid !== null && isValid !== undefined,
        })}
      />
    </label>
  </div>
);
