<template>
  <div
    class="fixed bottom-0 w-full md:static flex shadow-sm rounded-sm p-7 gap-y-5 border-2 border-gray-200 justify-between items-center bg-white">
    <div class="flex flex-col">
      <span class="uppercase text-3xs text-ink-500 font-bold">{{ footerLabel }}</span>
      <span class="text-xl font-extrabold">{{ selectedFareName }}</span>
    </div>

    <BaseButton height="h-[3.5rem]" :suffix-icon="ArrowRightDashedIcon" @click="emit('continue')">
      <span class="text-sm font-bold">{{ buttonLabel }}</span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  footerLabel: string;
  selectedFareName: string;
  buttonLabel: string;
}>();

const emit = defineEmits<{ continue: [] }>();
</script>
