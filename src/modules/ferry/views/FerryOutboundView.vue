<template>
  <FerryNavHeader title="Elige un ferry de ida" @back="$router.back()" />
  <section class="flex w-full">
    <div class="w-2/3 p-10 flex flex-col">
      <SearchSummaryCard
        origin-name="Puerto ayora"
        origin-island="Puerto ayora"
        destination-name="Puerto ayora"
        destination-island="Puerto ayora"
        date="Dom, 12 abr 2026"
        :passengers="2"
        duration="~2h 30min"
      />
      <TripTypeBadges class="mt-5" :is-round-trip="store.isRoundTrip" />

      <div class="flex w-full justify-between items-center my-6">
        <span class="text-sm">HORARIOS DISPONIBLES</span>
        <BaseButton size="xs" :prefix-icon="UserIcon" icon-class="size-3.5" variant="soft">
          Ordenar
        </BaseButton>
      </div>

      <div class="flex flex-col gap-y-5">
        <ScheduleCard
          v-for="i in 5"
          :key="i"
          :origin="{
            time: '07:00',
            island: 'ISLA SANTA CRUZ',
            dock: 'Muelle Turístico Gus Angermeyer (SCX)',
            address: 'Puerto Ayora, Isla Santa Cruz, ECU',
          }"
          :destination="{
            time: '09:30',
            island: 'ISLA SANTA CRUZ',
            dock: 'Muelle Turístico Gus Angermeyer (SCX)',
            address: 'Puerto Ayora, Isla Santa Cruz, ECU',
          }"
          duration="~2h 30min"
          :price="{ amount: 37, currency: 'USD', label: 'Por pasajero, por ruta' }"
          :selected="selectedSchedule === i"
          @select="handleSelect(i)"
        />
      </div>
    </div>
    <div class="w-1/3 bg-red-300">B</div>
  </section>
  <h1 class="text-h1">Ferry Outbound View</h1>
  <BaseButton @click="goTo"> {{ bottonLabel }} </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed, ref } from 'vue';
import SearchSummaryCard from '@/modules/ferry/components/SearchSummaryCard.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import ScheduleCard from '@/modules/ferry/components/ScheduleCard.vue';

const store = useFerrySearchStore();
const {} = useScheduleQuery();
const { goToInbound, goToTripSummary } = useFerryNavigation();

const selectedSchedule = ref<number | null>(null);
const handleSelect = (i: number) => {
  selectedSchedule.value = i;
  console.log('Selected schedule:', i);
};

const bottonLabel = computed(() => (store.isRoundTrip ? 'Go to Inbound' : 'Continue'));
const goTo = () => (store.isRoundTrip ? goToInbound() : goToTripSummary());
</script>
