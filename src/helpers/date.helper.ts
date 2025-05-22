import moment from 'moment';
import { Period } from '../interfaces/common.interface';
import { DATE_FORMAT, MONTH_FORMAT, YEAR_FORMAT, DATE_TIME_FORMAT } from '../constants';

export function formatDateTime(date: any, format: string = DATE_TIME_FORMAT): string {
  return moment.utc(date).local().format(format);
}

export function isCurrentPeriod(date: any, period: Period): boolean {
  return formatByPeriod(moment(), period) === formatByPeriod(moment(date), period);
}

export function isFuture(date: any): boolean {
  return moment(date).isAfter(moment());
}

export function isPastOrToday(date: any): boolean {
  return moment(date).diff(moment().format(DATE_FORMAT), 'days') <= 0;
}

export function formatByPeriod(date: any, period: Period): any {
  switch (period) {
    case Period.DAY:
      return date = moment(date).format(DATE_FORMAT);
    case Period.MONTH:
      return date = moment(date).format(MONTH_FORMAT);
    case Period.YEAR:
      return date = moment(date).format(YEAR_FORMAT);
  }
}
