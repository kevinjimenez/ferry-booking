<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <img src="@/assets/spinner.svg" class="size-56" alt="loading" />
    </div>
  </transition>

  <!-- <VueQueryDevtools /> -->
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

const { isLoading } = storeToRefs(useLoadingStore());
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

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
