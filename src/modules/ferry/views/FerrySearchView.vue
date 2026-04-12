<template>
  <div class="h-full flex flex-col">
    <header class="flex flex-col items-center justify-center h-96 w-full bg-primary gap-10">
      <div class="flex flex-col items-center gap-y-5">
        <h1 class="text-white text-4xl">Explora las Islas Galápagos</h1>

        <h4 class="text-gray-400 text-lg font-secondary-italic font-light w-3/4 text-center">
          Reserva tu ferry entre Santa Cruz, San Cristóbal e Isabela de forma rápida y segura
        </h4>
      </div>

      <div class="flex gap-5">
        <BaseIconLabel label="3 Islas Principales" :prefix-icon="CompassIcon" />

        <BaseIconLabel label="3 Islas Principales" :prefix-icon="FerryIcon" />

        <BaseIconLabel label="3 Islas Principales" :prefix-icon="ShieldCheckIcon" />
      </div>
    </header>

    <section class="flex items-center justify-center">
      <div class="bg-white w-2/3 flex flex-col items-center justify-center p-10 rounded-md gap-y-5">
        <BaseButtonGroup class="w-full" v-model="ticketType" :options="TICKET_TYPE_OPTIONS" />

        <div class="w-full flex gap-5">
          <BaseSelect
            v-model="origin"
            v-bind="originAttrs"
            label="Desde"
            :prefix-icon="MapPinIcon"
            prefix-icon-class="text-secondary"
            :options="mock"
            :error="errors.origin"
            :disabled-value="destination?.id"
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
            :options="mock"
            :error="errors.destination"
            :disabled-value="origin?.id"
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
    </section>
  </div>
</template>

<script setup lang="ts">
import CompassIcon from '@/shared/icons/CompassIcon.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import ShieldCheckIcon from '@/shared/icons/ShieldCheckIcon.vue';
import BaseButtonGroup from '@/shared/components/base/BaseButtonGroup.vue';
import { TICKET_TYPE_OPTIONS } from '@/modules/ferry/constants';
import { useSearchForm } from '@/modules/ferry/composables';
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';
import BaseSelect from '@/shared/components/base/BaseSelect.vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { SearchFerryMapper } from '@/modules/ferry/mappers';
import MapPinIcon from '@/shared/icons/MapPinIcon.vue';
import SwitchHorizontalIcon from '@/shared/icons/SwitchHorizontalIcon.vue';
import BaseInput from '@/shared/components/base/BaseInput.vue';
import BaseInputNumber from '@/shared/components/base/BaseInputNumber.vue';

const mock = [
  { label: 'label 1', value: 'value 1', id: '1' },
  { label: 'string 2', value: 'value 2', id: '2' },
];

const {
  // properties
  ticketType,
  originAttrs,
  origin,
  destination,
  destinationAttrs,
  errors,
  handleSubmit,
  passengerCount,
  outboundDate,
  outboundDateAttrs,
  inboundDate,
  inboundDateAttrs,
  setFieldValue,
} = useSearchForm();

const swapOriginDestination = () => {
  const prev = { origin: origin.value, destination: destination.value };
  console.log('swapOriginDestination', prev);

  setFieldValue('origin', prev.destination);
  setFieldValue('destination', prev.origin);
};

const onSubmit = handleSubmit(values => {
  console.log('submit', values);

  SearchFerryMapper.toRequest();
  // const request = SearchFerryMapper.toRequest();
  // console.log('request', request);
});
</script>
