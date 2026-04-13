<template>
  <BaseBadge
    :label="label"
    class="badge-outline badge-sm uppercase tracking-widest font-semibold text-2xs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge from '@/shared/components/base/BaseBadge.vue';

const props = withDefaults(
  defineProps<{
    type?: 'direct' | 'with-stops';
    stops?: number;
  }>(),
  { type: 'direct', stops: 0 },
);

const label = computed(() =>
  props.type === 'direct' ? 'Directo' : `${props.stops} parada${props.stops !== 1 ? 's' : ''}`,
);
</script>
