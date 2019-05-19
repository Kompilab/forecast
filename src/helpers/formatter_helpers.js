import React from 'react';
import StringHelpers from './string_helpers';
import numeral from 'numeral';

const FormattersHelpers = {
  /**
   * formatErrors
   * returns a li list of all errors
   */
  formatErrors (errors) {
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
  },

  /**
   * formatAmount
   * returns amount formatted with naira symbol
   * 118985.12 becomes ₦ 118,985.12
   */
  formatAmount (amount) {
    return `&#x20a6; ${numeral(amount).format('0,0.00')}`
  }
};

export default FormattersHelpers
