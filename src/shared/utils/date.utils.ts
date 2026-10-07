import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';

dayjs.extend(utc);
dayjs.extend(timezone);

// Los horarios de los ferries son hora local de Galápagos (UTC-6, sin DST),
// sin importar la zona horaria del navegador del usuario.
const GALAPAGOS_TZ = 'Pacific/Galapagos';

export const formatDate = (value: string | Date, format: string = DATE_FORMATS.DISPLAY) => {
  if (!value) return '';
  const parsed = dayjs(value);
  if (!parsed.isValid()) return '';
  return parsed.format(format);
};

export const formatTime = (value: string | Date, format = DATE_FORMATS.TIME) => {
  if (!value) return '';
  const parsed = dayjs(value).tz(GALAPAGOS_TZ);
  if (!parsed.isValid()) return '';
  return parsed.format(format);
};

export const formatDuration = (start: string | Date, end: string | Date): string => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  if (!startDate.isValid() || !endDate.isValid()) return '';
  const totalMinutes = endDate.diff(startDate, 'minute');
  if (totalMinutes <= 0) return '';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export const getAge = (dateOfBirth: string | Date, referenceDate: string | Date = new Date()): number =>
  dayjs(referenceDate).diff(dayjs(dateOfBirth), 'year');

export const isChildUnderFive = (dateOfBirth: string | Date, referenceDate: string | Date = new Date()): boolean =>
  getAge(dateOfBirth, referenceDate) < 5;
