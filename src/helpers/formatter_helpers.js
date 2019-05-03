import React from 'react';
import StringHelpers from './string_helpers';

const FormattersHelpers = {};

/**
 * formatErrors
 * returns a li list of all errors
 */
FormattersHelpers.formatErrors = (errors) => {
  let keys = Object.keys(errors);

  if (keys[0] === 'errors') {
    const prevErrors = errors;
    errors = prevErrors[keys[0]];
    keys = Object.keys(prevErrors[keys[0]]);
  }

  return keys.map((key, i) => {
    return (
      <li key={i}>
        { `${key === 'error' ? '' : StringHelpers.capitalizeStr(key)} ${errors[key]}` }
      </li>
    )
  })
}

export default FormattersHelpers
