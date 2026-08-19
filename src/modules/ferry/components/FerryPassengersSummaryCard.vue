<template>
  <BaseCard :icon="UsersIcon" :title="$t('ferry.ferryPassengersSummaryCard.title')" icon-class="size-5"
    title-class="text-base text-text-muted font-semibold">
    <div class="flex gap-x-3">
      <BaseAvatar class="size-10 bg-border">
        <UserIcon class="size-5" />
      </BaseAvatar>
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ $t('ferry.ferryPassengersSummaryCard.adultCount', { count: passengers }) }}</span>
        <span class="text-sm text-text-secondary font-semibold">{{ $t('ferry.ferryPassengersSummaryCard.standardFare') }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseAvatar from '@/shared/components/ui/BaseAvatar.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import UsersIcon from '@/shared/icons/UsersIcon.vue';
import BaseCard from '@/shared/components/ui/BaseCard.vue';

defineProps<{ passengers: number }>();
</script>
