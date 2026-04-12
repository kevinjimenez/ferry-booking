import * as yup from 'yup';
import { TicketType } from '@/modules/ferry/enums';

export const searchFormSchema = yup.object({
  ticketType: yup.string().required().oneOf([TicketType.ONE_WAY, TicketType.ROUND_TRIP]),
  origin: yup.object().required(),
  destination: yup.object().required(),
  outboundDate: yup.date().required(),
  inboundDate: yup.string().when('ticketType', {
    is: TicketType.ROUND_TRIP,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired(),
  }),
  passengerCount: yup.number().required().min(1).max(10),
});
