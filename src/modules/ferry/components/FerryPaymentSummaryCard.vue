<template>
  <BaseCard :icon="UsersIcon" title="Resumen de pago" icon-class="size-5"
    title-class="text-base text-text-muted font-semibold">
    <div class="flex flex-col gap-y-1">
      <LabelValue label="Ferry de ida" :value="outboundLabel" :custom-class="{
        label: 'text-md text-primary font-normal',
        value: 'text-md text-primary font-normal',
      }" />
      <LabelValue v-if="outboundFareName" :label="outboundFareName" :value="outboundFarePrice ?? ''" :custom-class="{
        label: 'text-sm text-text-muted font-normal',
        value: 'text-sm text-text-muted font-normal',
      }" />
    </div>

    <div v-if="isRoundTrip" class="flex flex-col gap-y-1">
      <LabelValue label="Ferry de vuelta" :value="inboundLabel" :custom-class="{
        label: 'text-md text-primary font-normal',
        value: 'text-md text-primary font-normal',
      }" />
      <LabelValue v-if="inboundFareName" :label="inboundFareName" :value="inboundFarePrice ?? ''" :custom-class="{
        label: 'text-sm text-text-muted font-normal',
        value: 'text-sm text-text-muted font-normal',
      }" />
    </div>

    <BaseDivider />

    <LabelValue label="Total" :value="total" :custom-class="{
      label: 'text-lg text-primary font-semibold',
      value: 'text-2xl text-primary font-semibold',
    }" />
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/shared/components/ui/BaseCard.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';
import LabelValue from '@/shared/components/LabelValue.vue';
import UsersIcon from '@/shared/icons/UsersIcon.vue';

defineProps<{
  isRoundTrip: boolean;
  total: string;
  outboundLabel: string;
  inboundLabel: string;
  outboundFareName?: string;
  outboundFarePrice?: string;
  inboundFareName?: string;
  inboundFarePrice?: string;
}>();
</script>
