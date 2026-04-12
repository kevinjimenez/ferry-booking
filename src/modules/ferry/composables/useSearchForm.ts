import { useForm } from 'vee-validate';
import { searchFormSchema } from '@/modules/ferry/schemas';
import type { SearchFormValues } from '@/modules/ferry/types';
import { TicketType } from '@/modules/ferry/enums';

export const useSearchForm = () => {
  const { handleSubmit, defineField, errors, setFieldValue } = useForm<SearchFormValues>({
    validationSchema: searchFormSchema,
    initialValues: {
      ticketType: TicketType.ONE_WAY,
      origin: Object.assign({}),
      destination: Object.assign({}),
      outboundDate: '',
      inboundDate: '',
      passengerCount: 1,
    },
  });

  const [ticketType] = defineField('ticketType');
  const [origin, originAttrs] = defineField('origin');
  const [destination, destinationAttrs] = defineField('destination');
  const [outboundDate, outboundDateAttrs] = defineField('outboundDate');
  const [inboundDate, inboundDateAttrs] = defineField('inboundDate');
  const [passengerCount] = defineField('passengerCount');

  return {
    // Form state
    errors,
    handleSubmit,
    ticketType,
    origin,
    originAttrs,
    destination,
    destinationAttrs,
    passengerCount,
    outboundDate,
    outboundDateAttrs,
    inboundDate,
    inboundDateAttrs,
    setFieldValue,
  };
};
