<template>
  <div
    class="bg-white w-2/3 flex flex-col items-center justify-center p-10 rounded-md gap-y-5 shadow-lg"
  >
    <BaseButtonGroup class="w-full" v-model="ticketType" :options="TICKET_TYPE_OPTIONS" />

    <div class="w-full flex gap-5">
      <BaseSelect
        v-model="origin"
        v-bind="originAttrs"
        label="Desde"
        :prefix-icon="MapPinIcon"
        prefix-icon-class="text-secondary"
        :options="portsResponse ?? []"
        :error="errors.origin"
        :disabled-value="destination?.value"
      />

      <BaseButton
        circle
        class="mt-6 size-12"
        :prefix-icon="SwitchHorizontalIcon"
        @click="swapOriginDestination"
      />

      <BaseSelect
        v-model="destination"
        v-bind="destinationAttrs"
        label="Hasta"
        :prefix-icon="MapPinIcon"
        prefix-icon-class="text-secondary"
        :options="portsResponse ?? []"
        :error="errors.destination"
        :disabled-value="origin?.value"
      />
    </div>

    <div class="w-full flex gap-5">
      <BaseInput
        type="date"
        label="Fecha de salida"
        v-model="outboundDate"
        v-bind="outboundDateAttrs"
        :error="errors.outboundDate"
      />

      <BaseInput
        v-if="isRoundTrip"
        type="date"
        label="Fecha de regreso"
        v-model="inboundDate"
        v-bind="inboundDateAttrs"
        ahora
        :error="errors.inboundDate"
      />

      <BaseInputNumber label="No. Pasajeros" v-model="passengerCount" :min="1" :max="10" />
    </div>

    <BaseButton @click="onSubmit" class="w-full"> Buscar Ferry </BaseButton>
  </div>
</template>
<script setup lang="ts">
import BaseButtonGroup from '@/shared/components/base/BaseButtonGroup.vue';
import { TICKET_TYPE_OPTIONS } from '@/modules/ferry/constants';
import BaseSelect from '@/shared/components/base/BaseSelect.vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import MapPinIcon from '@/shared/icons/MapPinIcon.vue';
import SwitchHorizontalIcon from '@/shared/icons/SwitchHorizontalIcon.vue';
import BaseInput from '@/shared/components/base/BaseInput.vue';
import BaseInputNumber from '@/shared/components/base/BaseInputNumber.vue';
import { useSearchForm } from '@/modules/ferry/composables';
import { useGetPortsQuery } from '@/modules/ferry/queries';

const { data: portsResponse } = useGetPortsQuery();

const {
  // properties
  ticketType,
  originAttrs,
  origin,
  destination,
  destinationAttrs,
  errors,
  onSubmit,
  passengerCount,
  outboundDate,
  outboundDateAttrs,
  inboundDate,
  inboundDateAttrs,
  setFieldValue,
  isRoundTrip,
} = useSearchForm();

const swapOriginDestination = () => {
  const prev = { origin: origin.value, destination: destination.value };

  setFieldValue('origin', prev.destination);
  setFieldValue('destination', prev.origin);
};
</script>
