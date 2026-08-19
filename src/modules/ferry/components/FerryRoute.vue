<template>
  <div class="flex sm:gap-x-10 md:justify-center md:items-center">
    <FerryStopDetail :customClass="originStopDetailClass" :time="origin.time" :island="origin.island"
      :pier-name="origin.pierName" :port-address="origin.portAddress" />

    <ScheduleTimeline :class="timelineClass" />

    <FerryStopDetail :customClass="destinationStopDetailClass" :time="destination.time" :island="destination.island"
      :pier-name="destination.pierName" :port-address="destination.portAddress" />
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
  pierName?: string;
  portAddress?: string;
}

withDefaults(
  defineProps<{
    origin: StopDetail;
    destination: StopDetail;
    originStopDetailClass?: StopDetailCustomClass;
    destinationStopDetailClass?: StopDetailCustomClass;
    timelineClass?: string;
  }>(),
  {
    timelineClass: 'w-50',
  },
);
</script>
