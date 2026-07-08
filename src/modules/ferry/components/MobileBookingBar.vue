<template>
  <div class="flex items-center gap-x-3 w-full">
    <div class="flex flex-col flex-1 min-w-0">
      <span v-if="ferryName" class="text-3xs sm:text-sm text-ink-500 truncate">{{
        ferryName
        }}</span>
      <span v-else class="text-2xs text-sm text-ink-500">Selecciona un ferry</span>
      <span v-if="route" class="text-2xs sm:text-lg font-semibold text-primary">{{
        route
        }}</span>
    </div>

    <div class="flex flex-col items-center justify-center shrink-0">
      <span class="text-xs sm:text-sm text-ink-500">Total</span>
      <span class="text-lg sm:text-h5 font-extrabold text-secondary">{{ total }}</span>
    </div>

    <BaseButton :disabled="!ferryName" :suffix-icon="ArrowRightDashedIcon" icon-class="size-4" size="sm"
      class="shrink-0" height="sm:h-[3rem]" @click="$emit('continue')">
      <span class="sm:text-xs font-bold">{{ buttonLabel }}</span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

withDefaults(
  defineProps<{
    ferryName?: string;
    route?: string;
    total: string;
    buttonLabel?: string;
  }>(),
  { buttonLabel: 'Continuar' },
);

defineEmits<{ continue: [] }>();
</script>
