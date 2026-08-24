import * as yup from 'yup';
import type { Locale } from '@/i18n';

const MESSAGES: Record<Locale, Parameters<typeof yup.setLocale>[0]> = {
  es: {
    mixed: {
      default: 'No es válido',
      required: 'Este campo es requerido',
      oneOf: 'Debe ser uno de los siguientes valores: ${values}',
      notOneOf: 'No debe ser uno de los siguientes valores: ${values}',
      defined: 'Debe estar definido',
      notNull: 'No puede ser nulo',
      notType: 'Debe ser un valor válido',
    },
    string: {
      length: 'Debe tener exactamente ${length} caracteres',
      min: 'Debe tener al menos ${min} caracteres',
      max: 'Debe tener como máximo ${max} caracteres',
      email: 'Debe ser un correo electrónico válido',
      url: 'Debe ser una URL válida',
      trim: 'No debe contener espacios al inicio o al final',
      lowercase: 'Debe estar en minúsculas',
      uppercase: 'Debe estar en mayúsculas',
      matches: 'Debe coincidir con el siguiente patrón: "${regex}"',
    },
    number: {
      min: 'Debe ser mayor o igual a ${min}',
      max: 'Debe ser menor o igual a ${max}',
      lessThan: 'Debe ser menor a ${less}',
      moreThan: 'Debe ser mayor a ${more}',
      positive: 'Debe ser un número positivo',
      negative: 'Debe ser un número negativo',
      integer: 'Debe ser un número entero',
    },
    date: {
      min: 'Debe ser posterior a ${min}',
      max: 'Debe ser anterior a ${max}',
    },
    array: {
      min: 'Debe tener al menos ${min} elementos',
      max: 'Debe tener como máximo ${max} elementos',
    },
  },
  en: {
    mixed: {
      default: 'Not valid',
      required: 'This field is required',
      oneOf: 'Must be one of the following values: ${values}',
      notOneOf: 'Must not be one of the following values: ${values}',
      defined: 'Must be defined',
      notNull: 'Cannot be null',
      notType: 'Must be a valid value',
    },
    string: {
      length: 'Must be exactly ${length} characters',
      min: 'Must be at least ${min} characters',
      max: 'Must be at most ${max} characters',
      email: 'Must be a valid email address',
      url: 'Must be a valid URL',
      trim: 'Must not contain leading or trailing spaces',
      lowercase: 'Must be lowercase',
      uppercase: 'Must be uppercase',
      matches: 'Must match the following pattern: "${regex}"',
    },
    number: {
      min: 'Must be greater than or equal to ${min}',
      max: 'Must be less than or equal to ${max}',
      lessThan: 'Must be less than ${less}',
      moreThan: 'Must be greater than ${more}',
      positive: 'Must be a positive number',
      negative: 'Must be a negative number',
      integer: 'Must be an integer',
    },
    date: {
      min: 'Must be later than ${min}',
      max: 'Must be earlier than ${max}',
    },
    array: {
      min: 'Must have at least ${min} items',
      max: 'Must have at most ${max} items',
    },
  },
};

export const setYupLocale = (locale: Locale) => {
  yup.setLocale(MESSAGES[locale]);
};
