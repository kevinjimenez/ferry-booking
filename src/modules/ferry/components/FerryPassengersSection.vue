<template>
  <BaseCard :icon="UsersIcon" title="Información de Pasajeros">
    <FerryPassengerItem v-for="(passenger, index) in passengers" :key="passenger.key" :index="index + 1"
      :name-prefix="`passengers[${index}]`" />
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/shared/components/ui/BaseCard.vue';
import FerryPassengerItem from '@/modules/ferry/components/FerryPassengerItem.vue';
import UsersIcon from '@/shared/icons/UsersIcon.vue';
import type { PersonFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';
import type { FieldEntry } from 'vee-validate';

defineProps<{ passengers: FieldEntry<PersonFormValues>[] }>();
</script>
