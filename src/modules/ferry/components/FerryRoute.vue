<template>
  <div class="flex gap-x-10 justify-center items-center">
    <FerryStopDetail
      :customClass="originStopDetailClass"
      :time="origin.time"
      :port="origin.port"
      :island="origin.island"
      :address="origin.address"
    />

    <ScheduleTimeline :duration="duration" :class="timelineClass" />

    <FerryStopDetail
      :customClass="destinationStopDetailClass"
      :time="destination.time"
      :port="destination.port"
      :island="destination.island"
      :address="destination.address"
    />
  </div>
</template>
<script setup lang="ts">
import ScheduleTimeline from '@/modules/ferry/components/ScheduleTimeline.vue';
import FerryStopDetail, {
  type StopDetailCustomClass,
} from '@/modules/ferry/components/FerryStopDetail.vue';

interface StopDetail {
  time: string;
  port: string;
  island: string;
  address?: string;
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
