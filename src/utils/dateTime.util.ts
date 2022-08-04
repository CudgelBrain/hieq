import { format, addMonths, addWeeks } from 'date-fns';
import { enIN } from 'date-fns/locale';

export const formatDate = (date: string, dateFormat = 'd LLL yyyy hh:mm b') => {
  return format(new Date(date), dateFormat, { locale: enIN });
};

export const addMonth = (duration: number) => addMonths(new Date(), duration);

export const addWeek = (duration: number) => addWeeks(new Date(), duration);
