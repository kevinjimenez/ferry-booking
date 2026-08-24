import * as yup from 'yup';
import type { ComposerTranslation } from 'vue-i18n';
import {
  isValidEcuadorianCedula,
  isValidEcuadorianRuc,
  isValidPassport,
} from '@/shared/utils/document-validation.utils.ts';

const createPersonSchema = (t: ComposerTranslation) =>
  yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    country: yup.object().shape({ value: yup.string().required() }).required(),
    city: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(/^(\+\d{1,4}\s?\d{6,12}|0\d{9})$/, t('schemas.passengerDetails.invalidPhone')),
    dateOfBirth: yup
      .string()
      .required()
      .test('valid-date-of-birth', t('schemas.passengerDetails.invalidDateOfBirth'), value => {
        if (!value) return true;

        const date = new Date(value);
        return !Number.isNaN(date.getTime()) && date <= new Date();
      }),
    documentType: yup.object().shape({ value: yup.string().required() }).required(),
    documentNumber: yup
      .string()
      .required()
      .test(
        'valid-document-number',
        t('schemas.passengerDetails.invalidDocumentNumber'),
        function (value) {
          if (!value) return true;

          const documentType = this.parent.documentType?.value as string | undefined;
          const country = this.parent.country?.value as string | undefined;

          if (documentType === 'dni') {
            return country === 'EC' ? isValidEcuadorianCedula(value) : /^\d{5,15}$/.test(value);
          }
          if (documentType === 'ruc') {
            return isValidEcuadorianRuc(value);
          }
          if (documentType === 'passport') {
            return isValidPassport(value);
          }
          return true;
        },
      ),
  });

const createContactSchema = (t: ComposerTranslation) =>
  createPersonSchema(t).shape({
    contactType: yup.string(),
    firstName: yup.string().when('contactType', {
      is: 'natural_person',
      then: schema => schema.required(),
      otherwise: schema => schema.notRequired(),
    }),
    lastName: yup.string().when('contactType', {
      is: 'natural_person',
      then: schema => schema.required(),
      otherwise: schema => schema.notRequired(),
    }),
    legalName: yup.string().when('contactType', {
      is: 'juridical_person',
      then: schema => schema.required(),
      otherwise: schema => schema.notRequired(),
    }),
    dateOfBirth: yup.string().notRequired(),
  });

export const createPassengerDetailsSchema = (t: ComposerTranslation) =>
  yup.object({
    contact: createContactSchema(t).required(),
    passengers: yup.array(createPersonSchema(t)).required(),
  });
