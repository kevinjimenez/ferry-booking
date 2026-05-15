<template>
  <div class="flex flex-col w-full border border-gray-200 rounded-sm shadow-sm bg-white p-5 gap-y-5">
    <SectionCardHeader label="ANTES DE ZARPAR" title="Tu plan de embarque">
      <template #right>
        <span class="text-2xs text-ink-500 font-semibold shrink-0">
          Duración total: <span class="font-semibold text-primary">{{ duration }}</span>
        </span>
      </template>
    </SectionCardHeader>

    <div class="flex flex-col gap-y-4">
      <TimelineStep
        v-for="(step, index) in steps"
        :key="index"
        :time="step.time"
        :text="step.text"
        :subtitle="step.subtitle"
        :active="index === steps.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionCardHeader from '@/shared/components/SectionCardHeader.vue';
import TimelineStep from '@/shared/components/TimelineStep.vue';

export interface DepartureStep {
  time: string;
  text: string;
  subtitle?: string;
}

defineProps<{
  duration: string;
  steps: DepartureStep[];
}>();
</script>
