import { storeToRefs } from 'pinia';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useGetTicketQuery } from '@/modules/ferry/queries/get-ticket.query.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { loggerServices } from '@/shared/services';

export const useTicketQuery = () => {
  const ferryTicketStore = useFerryTicketStore();
  const { ticketId } = storeToRefs(ferryTicketStore);
  const { goToSearch } = useFerryNavigation();
  loggerServices.log('useTicketQuery', ticketId);

  // watchEffect(async () => {
  //   if (!ticketId) {
  //     await goToSearch();
  //   }
  // });

  return useGetTicketQuery(ticketId);
};
