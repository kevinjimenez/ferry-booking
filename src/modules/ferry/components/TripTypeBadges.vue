<template>
  <div class="flex gap-x-5">
    <BaseBadge
      label="Ida"
      :prefix-icon="FerryIcon"
      icon-class="size-4"
      variant="secondary"
      :soft="active !== 'outbound'"
    />
    <template v-if="isRoundTrip">
      <ArrowRightDashedIcon class="text-text-muted" />
      <BaseBadge
        label="Vuelta"
        :prefix-icon="FerryIcon"
        :icon-class="`size-4 ${inboundActiveClass}`"
        :label-class="inboundActiveClass"
        :soft="active !== 'inbound'"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/base/BaseBadge.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    isRoundTrip?: boolean;
    active?: 'outbound' | 'inbound';
  }>(),
  { isRoundTrip: false, active: 'outbound' },
);

const inboundActiveClass = computed(() =>
  props.active !== 'inbound' ? 'text-text-muted' : 'text-white',
);
</script>
