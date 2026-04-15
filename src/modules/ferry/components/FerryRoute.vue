<template>
  <div class="flex gap-x-10 justify-center items-center">
    <FerryStopDetail
      :time="origin.time"
      :port="origin.port"
      :island="origin.island"
      :address="origin.address"
    />

    <ScheduleTimeline :duration="duration" class="w-50" />

    <FerryStopDetail
      :time="destination.time"
      :port="destination.port"
      :island="destination.island"
      :address="destination.address"
    />
  </div>
</template>
<script setup lang="ts">
import ScheduleTimeline from '@/modules/ferry/components/ScheduleTimeline.vue';
import FerryStopDetail from '@/modules/ferry/components/FerryStopDetail.vue';
interface StopDetail {
  time: string;
  port: string;
  island: string;
  address: string;
}

defineProps<{
  origin: StopDetail;
  destination: StopDetail;
  duration: string;
}>();
</script>
