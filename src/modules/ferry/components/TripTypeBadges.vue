<template>
  <div class="flex gap-x-5">
    <BaseBadge
      label="Ida"
      :prefix-icon="UserIcon"
      icon-class="size-4"
      variant="secondary"
      :soft="active !== 'outbound'"
    />
    <template v-if="isRoundTrip">
      <ArrowLeftIcon class="rotate-180 text-text-muted" />
      <BaseBadge
        label="Vuelta"
        :prefix-icon="UserIcon"
        icon-class="size-4 text-text-muted"
        label-class="text-text-muted"
        :soft="active !== 'inbound'"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import UserIcon from '@/shared/icons/UserIcon.vue';
import ArrowLeftIcon from '@/shared/icons/ArrowLeftIcon.vue';
import BaseBadge from '@/shared/components/base/BaseBadge.vue';

withDefaults(
  defineProps<{
    isRoundTrip?: boolean;
    active?: 'outbound' | 'inbound';
  }>(),
  { isRoundTrip: false, active: 'outbound' },
);
</script>
