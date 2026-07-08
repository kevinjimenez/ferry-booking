<template>
  <BaseCollapse :default-open="index === 1">
    <template #title>
      <BaseIconLabel :prefix-icon="UserIcon" icon-class="size-5 text-primary">
        <span class="text-base text-primary font-semibold">Pasajero {{ index }}</span>
      </BaseIconLabel>
      <BaseBadge :label="isComplete ? 'Completado' : 'Sin completar'" />
    </template>
    <FerryPersonForm :name-prefix="namePrefix" />
  </BaseCollapse>
</template>

<script setup lang="ts">
import UserIcon from '@/shared/icons/UserIcon.vue';
import BaseCollapse from '@/shared/components/ui/BaseCollapse.vue';
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';
import FerryPersonForm from '@/modules/ferry/components/forms/FerryPersonForm.vue';
import { useFormValues } from 'vee-validate';
import type { PassengerDetailsFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';
import { computed } from 'vue';

const props = defineProps<{ index: number; namePrefix: string }>();

const formValues = useFormValues<PassengerDetailsFormValues>();

const isComplete = computed(() => {
  const passenger = formValues.value.passengers?.[props.index - 1];
  if (!passenger) return false;
  return Object.values(passenger).every(v => v !== '' && v !== null && v !== undefined);
});
</script>
