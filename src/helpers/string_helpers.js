const StringHelpers = {};

/**
 * capitalizeStr
 * returns the string with the first character capitalized
 */
StringHelpers.capitalizeStr = (str, o={}) => {
  let separator = o.separator || ' ';
  if (str) {
    const parsed = str.replace(/[_-]/g, separator);
    return `${parsed.charAt(0).toUpperCase()}${parsed.substr(1).toLowerCase()}`
  }
}

/**
 * sentenceCase
 * capitalize the first character of every word in a sentence.
 * returns empty string if words is null
 */
StringHelpers.sentenceCase = (words, options = {}) => {
  let separator = options.separator || ' ';

  if (words) {
    return words.toLowerCase().replace(/[_-]/g, separator).replace(/\w\S*/g,
      function(word){
        return `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`
      });
  }
}

export default StringHelpers
