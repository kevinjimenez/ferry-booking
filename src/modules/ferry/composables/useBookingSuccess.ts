import { computed, onBeforeMount } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { StorageEnum } from '@/shared/enums';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { removeAppStorage } from '@/shared/utils/storage.utils.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { useFerryPaymentStore } from '@/modules/ferry/stores/ferry-payment.store.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store.ts';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store.ts';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useUpdatePayment } from '@/modules/ferry/actions/update-payment.action.ts';
import { useDownloadTicket } from '@/modules/ferry/queries/download-ticker.query.ts';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { formatDate } from '@/shared/utils/date.utils.ts';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';
import { maskString } from '@/shared/utils/string.utils.ts';
import { loggerServices } from '@/shared/services';

export const useBookingSuccess = () => {
  const route = useRoute();
  const router = useRouter();
  const { goToSearch } = useFerryNavigation();
  const { mutateAsync: updatePayment, isPending: updatePaymentPending } = useUpdatePayment();
  const { mutate: downloadTicket, isPending: downloadTicketPending } = useDownloadTicket();

  const ferryTicketStore = useFerryTicketStore();
  const paymentStore = useFerryPaymentStore();
  const searchStore = useFerrySearchStore();
  const selectionStore = useFerrySelectionStore();
  const bookingStore = useBookingStore();
  const passengersStore = useFerryPassengersStore();

  const paymentCompleted = useAppStorage(
    FERRY_STORAGE_KEYS.PAYMENT_COMPLETED,
    false,
    StorageEnum.SESSION,
  );
  const success = useAppStorage<{
    successPaymentId: string;
    successTicketId: string;
    amount: string;
    date: string;
    orderId: string;
  }>(
    FERRY_STORAGE_KEYS.SUCCESS,
    {
      successPaymentId: '',
      successTicketId: '',
      amount: '',
      date: '',
      orderId: '',
    },
    StorageEnum.SESSION,
  );

  const resetAllStores = () => {
    searchStore.reset();
    selectionStore.reset();
    bookingStore.reset();
    passengersStore.reset();
    paymentStore.reset();
    ferryTicketStore.reset();
  };

  onBeforeMount(async () => {
    const clientTransactionId = route.query.clientTransactionId as string;
    const id = route.query.id as string;

    loggerServices.log({ clientTransactionId, id });

    if (!clientTransactionId) {
      await router.replace({ name: FERRY_ROUTE_NAMES.SEARCH });
      return;
    }

    loggerServices.log({ paymentStore: paymentStore.paymentId });

    const paymentId =
      success.value.successPaymentId !== ''
        ? success.value.successPaymentId
        : paymentStore.paymentId;
    const ticketId =
      success.value.successTicketId !== ''
        ? success.value.successTicketId
        : ferryTicketStore.ticketId;


    paymentCompleted.value = true;

    if (paymentId && ticketId) {
      success.value = {
        successPaymentId: paymentId,
        successTicketId: ticketId,
        amount: '',
        date: '',
        orderId: '',
      };
    }

    resetAllStores();

    if (paymentId && id) {
      const response = await updatePayment({
        id: paymentId,
        body: { id, clientTransactionId, status: 'completed' },
      });

      success.value.amount = formatCurrency(Number(response.amount));
      success.value.date = formatDate(response.updated_at, DATE_FORMATS.DISPLAY_LONG);
      success.value.orderId = maskString(response.id);
    }
  });

  onBeforeRouteLeave(() => {
    removeAppStorage(FERRY_STORAGE_KEYS.PAYMENT_COMPLETED, StorageEnum.SESSION);
    success.value = null;
  });

  const handleDownloader = () => {
    const ticketId = success.value?.successTicketId;
    if (!ticketId) return;
    downloadTicket(ticketId);
  };

  return {
    downloadTicketPending,
    handleDownloader,
    goToSearch,
    updatePaymentPending,
    success: computed(() => success.value),
  };
};
