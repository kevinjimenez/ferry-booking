import { useCreateTicket } from '@/modules/ferry/actions/create-ticket.action.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';

export const useTicketAction = () => {
  const ticketStore = useFerryTicketStore();
  const { goToSearch } = useFerryNavigation();

  // watchEffect( async () => {
  //   if (!ticketStore.ticketId) await goToSearch(); // guard — redirige si no hay id
  // });

  const { mutateAsync: createTicket, isPending } = useCreateTicket();

  return { createTicket, isPending };
};
