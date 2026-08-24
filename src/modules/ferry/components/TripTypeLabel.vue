<template>
  <BaseBadge :label="label"
    class="badge-outline badge-sm uppercase tracking-widest font-semibold text-5xsxs md:text-2xs hidden sm:flex" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';

const props = withDefaults(
  defineProps<{
    type?: 'direct' | 'with-stops';
    stops?: number;
  }>(),
  { type: 'direct', stops: 0 },
);

const { t } = useI18n();

const label = computed(() =>
  props.type === 'direct'
    ? t('ferry.tripTypeLabel.direct')
    : t('ferry.tripTypeLabel.stops', { count: props.stops }),
);
</script>
