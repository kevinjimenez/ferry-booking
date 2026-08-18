<template>
  <div class="flex gap-x-5">
    <BaseBadge :label="$t('ferry.tripTypeBadges.outbound')" label-class="text-sm" :prefix-icon="FerryIcon" icon-class="size-6" variant="secondary"
      :soft="active !== 'outbound'" class="w-auto h-8" />
    <template v-if="isRoundTrip">
      <ArrowRightDashedIcon class="text-text-muted" />
      <BaseBadge :label="$t('ferry.tripTypeBadges.inbound')" :prefix-icon="FerryIcon" :icon-class="`size-6 ${inboundActiveClass}`"
        :label-class="inboundActiveClass" :soft="active !== 'inbound'" class="w-auto h-8" />
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';
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
  props.active !== 'inbound' ? 'text-text-muted text-sm' : 'text-white text-sm',
);
</script>
