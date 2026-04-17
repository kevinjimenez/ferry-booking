import * as yup from 'yup';
const personSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  documentType: yup.object().shape({ value: yup.string().required() }).required(),
  documentNumber: yup.string().required(),
});

export const passengerDetailsSchema = yup.object({
  contact: personSchema.required(),
  passengers: yup.array(personSchema).required(),
});
