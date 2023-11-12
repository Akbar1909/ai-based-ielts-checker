import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import 'dayjs/locale/zh-cn';

// import locale
dayjs.extend(isLeapYear); // use plugin
dayjs.locale('zh-cn'); // use locale
dayjs.extend(utc);

export function format(date: Date | number, separator = '.') {
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance');
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}#${month}#${year}`.replaceAll('#', separator);
}

export function subtract5Hours(date: Date) {
  // Create a new Date object for the current date and time

  // Subtract 5 hours from the current date and time
  date.setHours(date.getHours() - 5);
  return date;
}

export function formatDate(date: string | Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export default dayjs;
