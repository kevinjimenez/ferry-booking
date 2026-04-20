<template>
  <BaseCard
    :icon="UsersIcon"
    title="Resumen de pago"
    icon-class="size-5"
    title-class="text-base text-text-muted font-semibold"
  >
    <LabelValue
      label="Ferry de ida"
      :value="outboundLabel"
      :custom-class="{
        label: 'text-md text-primary font-normal',
        value: 'text-md text-primary font-normal',
      }"
    />

    <LabelValue
      v-if="isRoundTrip"
      label="Ferry de vuelta"
      :value="inboundLabel"
      :custom-class="{
        label: 'text-md text-primary font-normal',
        value: 'text-md text-primary font-normal',
      }"
    />

    <BaseDivider />

    <LabelValue
      label="Total"
      :value="total"
      :custom-class="{
        label: 'text-lg text-primary font-semibold',
        value: 'text-2xl text-primary font-semibold',
      }"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/shared/components/base/BaseCard.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import LabelValue from '@/shared/components/LabelValue.vue';
import UsersIcon from '@/shared/icons/UsersIcon.vue';

defineProps<{ isRoundTrip: boolean; total: string; outboundLabel: string; inboundLabel: string }>();
</script>
