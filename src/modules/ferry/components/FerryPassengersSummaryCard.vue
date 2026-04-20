<template>
  <BaseCard
    :icon="UsersIcon"
    title="Pasajeros"
    icon-class="size-5"
    title-class="text-base text-text-muted font-semibold"
  >
    <div class="flex gap-x-3">
      <BaseAvatar class="size-10 bg-border">
        <UserIcon class="size-5" />
      </BaseAvatar>
      <div class="flex flex-col">
        <span class="text-md font-semibold">{{ passengers}} Adulto</span>
        <span class="text-sm text-text-secondary">Tarifa estándar</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseAvatar from '@/shared/components/base/BaseAvatar.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import UsersIcon from '@/shared/icons/UsersIcon.vue';
import BaseCard from '@/shared/components/base/BaseCard.vue';

defineProps<{ passengers: number }>();
</script>
