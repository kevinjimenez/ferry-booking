<template>
  <div :class="[
    'w-full md:w-120 flex flex-col shadow-sm py-5 px-10 gap-y-5 border border-t-4 bg-white rounded-md cursor-default relative',
    selected === id ? 'border-secondary' : 'hover:border-secondary hover:shadow-2xl'
  ]">
    <div class="flex flex-col items-start justify-center">
      <span class="uppercase text-secondary text-3xs font-extrabold">{{ $t('ferry.fareCard.fareLabel') }}</span>
      <h3 class="text-h3 font-extrabold">{{ name }}</h3>
      <div class="mt-8">
        <span class="text-ink-500 text-xs font-semibold">USD</span>
        <span class="text-secondary font-extrabold text-[44px]">{{ price }}</span>
        <span class="text-ink-500 text-2xs">{{ $t('ferry.fareCard.perPassengerRoute') }}</span>
      </div>
    </div>

    <BaseDivider class="w-full" />

    <div class="flex flex-col">
      <span class="text-xs mb-10">{{ description }}</span>

      <BaseIconLabel v-for="(feature, i) in features" :key="`${feature.text}-${i}`"
        :prefix-icon="feature.included ? CircleCheckIcon : CircleXIcon"
        :icon-class="`size-7 ${feature.included ? 'text-primary' : 'text-text-muted'}`">
        <p :class="['text-xs leading-none', { 'line-through text-text-muted': !feature.included }]">
          {{ feature.text }}
        </p>
      </BaseIconLabel>
    </div>

    <BaseButton :class="['w-full', selected === id ? 'bg-secondary border-secondary' : '']" height="h-[3.5rem]"
      @click="emit('select')">
      <span class="text-sm font-bold uppercase">
        {{ selected !== id ? $t('ferry.fareCard.choose') : $t('ferry.fareCard.selected') }}
      </span>
    </BaseButton>

    <template v-if="selected === id">
      <div class="absolute rounded-full bg-secondary size-14 flex items-center justify-center right-10">
        <CheckIcon class="size-10 font-bold text-white" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import CircleCheckIcon from '@/shared/icons/CircleCheckIcon.vue';
import CircleXIcon from '@/shared/icons/CircleXIcon.vue';

export interface FareFeature {
  text: string;
  included: boolean;
}

defineProps<{
  id: string;
  name: string;
  price: number;
  description: string;
  features: FareFeature[];
  selected?: string
}>();

const emit = defineEmits<{ select: [] }>();
</script>
