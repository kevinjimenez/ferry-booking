<template>
  <div class="flex items-center gap-x-4">
    <!-- Circle indicator -->
    <div class="flex flex-col items-center shrink-0 mt-0.5">
      <div :class="[
        'size-6 rounded-full border-2 flex items-center justify-center',
        active
          ? 'bg-secondary border-secondary'
          : 'bg-white border-gray-300',
      ]">
        <div v-if="active" class="size-2 rounded-full bg-white" />
      </div>
    </div>

    <div class="flex items-center gap-x-3 flex-1">
      <span class="text-lg font-extrabold text-primary shrink-0">{{ time }}</span>
      <div class="flex flex-col">
        <span class="text-sm text-primary font-bold">{{ text }}</span>
        <span v-if="subtitle" class="text-xs font-semibold text-ink-500 mt-0.5">{{ subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    time: string;
    text: string;
    subtitle?: string;
    active?: boolean;
  }>(),
  {
    active: false,
  },
);
</script>
