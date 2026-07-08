<template>
  <div class="flex gap-x-10 justify-center items-center">
    <FerryStopDetail :customClass="originStopDetailClass" :time="origin.time" :island="origin.island"
      :description="origin.description" />

    <ScheduleTimeline :duration="duration" :class="timelineClass" />

    <FerryStopDetail :customClass="destinationStopDetailClass" :time="destination.time" :island="destination.island"
      :description="destination.description" />
  </div>
</template>
<script setup lang="ts">
import ScheduleTimeline from '@/modules/ferry/components/ScheduleTimeline.vue';
import FerryStopDetail, {
  type StopDetailCustomClass,
} from '@/modules/ferry/components/FerryStopDetail.vue';

interface StopDetail {
  time: string;
  island: string;
  description?: string;
}

withDefaults(
  defineProps<{
    origin: StopDetail;
    destination: StopDetail;
    duration: string;
    originStopDetailClass?: StopDetailCustomClass;
    destinationStopDetailClass?: StopDetailCustomClass;
    timelineClass?: string;
  }>(),
  {
    timelineClass: 'w-50',
  },
);
</script>
