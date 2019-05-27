import moment from 'moment';

const DateHelpers = {
  /**
   * calendar
   * returns formatted calendar time
   */
  calendar (date) {
    return moment(date).calendar(null, {
      lastDay : '[yesterday at] LT',
      sameDay : '[today at] LT',
      nextDay : '[tomorrow at] LT',
      lastWeek : '[last] dddd [at] LT',
      nextWeek : 'dddd [at] LT',
      sameElse : 'll'
  });
  }
};

export default DateHelpers
