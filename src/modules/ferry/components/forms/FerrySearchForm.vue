<template>
  <div
    class="bg-white w-112 sm:w-220 lg:w-2/3 flex flex-col items-center justify-center p-10 rounded-md gap-y-5 shadow-lg">
    <template v-if="isPending">
      <FerrySearchFormSkeleton />
    </template>

    <template v-else>
      <BaseButtonGroup class="w-full" v-model="ticketType" :options="ticketTypeOptions" font-size="sm" />

      <div class="w-full flex flex-col sm:flex-row gap-2 sm:gap-5">
        <BaseSelect v-model="origin" v-bind="originAttrs" :label="$t('ferry.ferrySearchForm.from')" :prefix-icon="MapPinIcon"
          :options="islandsResponse ?? []" :placeholder="$t('ferry.ferrySearchForm.fromPlaceholder')" prefix-icon-class="text-secondary"
          :error="errors.origin" :disabled-value="destination?.value" />

        <BaseButton circle class="sm:mt-6 size-12 self-center sm:self-auto" icon-class="size-7"
          :prefix-icon="SwitchHorizontalIcon" @click="swapOriginDestination" />

        <BaseSelect v-model="destination" v-bind="destinationAttrs" :label="$t('ferry.ferrySearchForm.to')" :prefix-icon="MapPinIcon"
          prefix-icon-class="text-secondary" :options="islandsResponse ?? []" :error="errors.destination"
          :placeholder="$t('ferry.ferrySearchForm.toPlaceholder')" :disabled-value="origin?.value" />
      </div>

      <div class="w-full flex flex-col sm:flex-row gap-2 sm:gap-5">
        <BaseInputDate :label="$t('ferry.ferrySearchForm.departureDate')" v-model="outboundDate" v-bind="outboundDateAttrs" :min-date="minDate"
          :max-date="inboundDate" :error="errors.outboundDate" :placeholder="$t('ferry.ferrySearchForm.datePlaceholder')" />

        <BaseInputDate v-if="isRoundTrip" :label="$t('ferry.ferrySearchForm.returnDate')" v-model="inboundDate" v-bind="inboundDateAttrs"
          :error="errors.inboundDate" :min-date="maxDate" :placeholder="$t('ferry.ferrySearchForm.datePlaceholder')" />

        <BaseInputNumber :label="$t('ferry.ferrySearchForm.passengerCount')" v-model="passengerCount" :min="1" :max="10"
          class="self-center sm:self-auto" />
      </div>

      <BaseButton @click="onSubmit" class="w-full" height="h-[3.5rem]">
        <span class="text-sm"> {{ $t('ferry.ferrySearchForm.searchButton') }} </span>
      </BaseButton>
    </template>
  </div>
</template>
<script setup lang="ts">
import BaseButtonGroup from '@/shared/components/ui/BaseButtonGroup.vue';
import { TICKET_TYPE_OPTIONS } from '@/modules/ferry/constants';
import BaseSelect from '@/shared/components/ui/BaseSelect.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import MapPinIcon from '@/shared/icons/MapPinIcon.vue';
import SwitchHorizontalIcon from '@/shared/icons/SwitchHorizontalIcon.vue';
import BaseInputDate from '@/shared/components/ui/BaseInputDate.vue';
import BaseInputNumber from '@/shared/components/ui/BaseInputNumber.vue';
import { useSearchForm } from '@/modules/ferry/composables';
import FerrySearchFormSkeleton from '@/modules/ferry/components/FerrySearchFormSkeleton.vue';
import { useGetIslandsQuery } from '../../queries';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { env } from '@/config/env';

const { data: islandsResponse, isPending } = useGetIslandsQuery();
const { t } = useI18n();

const minDate = computed(() => dayjs().add(env.minDate, 'day').toDate())
const maxDate = computed(() => dayjs(outboundDate.value).add(env.maxDate, 'day').toDate())

const ticketTypeOptions = computed(() =>
  TICKET_TYPE_OPTIONS.map(option => ({ ...option, label: t(option.label) })),
);

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
