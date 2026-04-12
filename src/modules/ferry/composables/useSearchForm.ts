import { useForm } from 'vee-validate'
import { searchFormSchema } from '@/modules/ferry/schemas'
import type { SearchFormValues } from '@/modules/ferry/types'

export const useSearchForm = () => {
  const { defineField} =
    useForm<SearchFormValues>({
      validationSchema: searchFormSchema,
    })

  const [ticketType] = defineField('ticketType')
  // const [origin, originAttrs] = defineField('origin')
  // const [destination, destinationAttrs] = defineField('destination')
  // const [outboundDate, outboundDateAttrs] = defineField('outboundDate')
  // const [inboundDate, inboundDateAttrs] = defineField('inboundDate')
  // const [passengerCount] = defineField('passengerCount')


  return {
    // Form state
    ticketType,
  }
}
