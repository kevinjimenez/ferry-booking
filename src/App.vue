<template>
  <router-view />
  <VueQueryDevtools />
</template>
<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
// import { useCatalogStore } from './shared/stores/catalog.store'

// const ferryBookingStore = useFerryBookingStore();
// const ferryUIStore = useFerryUIStore();

// Cargar catálogos al iniciar la aplicación
// const catalogStore = useCatalogStore()
// catalogStore.fetchCatalogs()

// const shouldFetch = ref(false);

// const { data: historyData } = useQuery({
//   queryKey: ['booking-history', ferryBookingStore.hold],
//   queryFn: () => getHistoryByIdAction(ferryBookingStore.hold),
//   enabled: shouldFetch,
//   staleTime: 5 * 60 * 1000,
// });

// watch(historyData, data => {
//   ferryUIStore.setNavigating(false);
//   if (data) {
//     ferryBookingStore.setBooking(data);
//   }
// });

// onMounted(() => {
//   loggerServices.log('asd');
//   ferryUIStore.setNavigating(false);
//   loggerServices.log(ferryBookingStore.hold, 'asd');
//   if (ferryBookingStore.hold) {
//     shouldFetch.value = true;
//     ferryUIStore.setNavigating(true);
//   }
// });
</script>
