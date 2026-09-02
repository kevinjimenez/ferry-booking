<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-6">
    <div class="bg-white w-full min-w-100 max-w-xl flex flex-col gap-y-5 p-8 rounded-md shadow-lg">
      <div>
        <h1 class="text-lg font-bold">Reporte de tickets</h1>
        <p class="text-2xs text-text-secondary">
          Descarga el listado de pasajeros y tickets según su fecha de salida.
        </p>
      </div>

      <div class="flex flex-col gap-y-3">
        <BaseInputDate label="Fecha de inicio" v-model="startDate" placeholder="dd/mm/aaaa" />
        <BaseInputDate label="Fecha de fin" v-model="endDate" :min-date="startDate" placeholder="dd/mm/aaaa" />
        <BaseSelect label="Estado" v-model="statusOption" :options="REPORT_STATUS_OPTIONS" />
        <BaseSelect label="Estado de pago" v-model="paymentStatusOption" :options="REPORT_PAYMENT_STATUS_OPTIONS" />
      </div>

      <span v-if="validationError" class="text-secondary text-2xs font-semibold">{{ validationError }}</span>
      <span v-if="error" class="text-secondary text-2xs font-semibold">{{ error.message }}</span>

      <div class="flex flex-col gap-2">
        <BaseButton class="w-full" height="h-[3.5rem]" :prefix-icon="DownloadIcon" icon-class="size-5"
          :loading="isPending" :disabled="!canSubmit" @click="download('pdf')">
          <span class="text-sm">Descargar PDF</span>
        </BaseButton>
        <BaseButton class="w-full" height="h-[3.5rem]" variant="outline" :prefix-icon="DownloadIcon" icon-class="size-5"
          :loading="isPending" :disabled="!canSubmit" @click="download('excel')">
          <span class="text-sm">Descargar Excel</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseInputDate from '@/shared/components/ui/BaseInputDate.vue';
import BaseSelect from '@/shared/components/ui/BaseSelect.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import DownloadIcon from '@/shared/icons/DownloadIcon.vue';
import {
  REPORT_STATUS_OPTIONS,
  REPORT_PAYMENT_STATUS_OPTIONS,
  MAX_REPORT_RANGE_DAYS,
} from '@/modules/admin/constants/report-status.constants';
import { useDownloadTicketsReport, type ReportFormat } from '@/modules/admin/queries/download-report.query';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const ALL_STATUSES_OPTION = REPORT_STATUS_OPTIONS[0]!;
const statusOption = ref(ALL_STATUSES_OPTION);
const ALL_PAYMENT_STATUSES_OPTION = REPORT_PAYMENT_STATUS_OPTIONS[0]!;
const paymentStatusOption = ref(ALL_PAYMENT_STATUSES_OPTION);

const { mutate, isPending, error } = useDownloadTicketsReport();

const validationError = computed(() => {
  if (!startDate.value || !endDate.value) return null;
  if (startDate.value > endDate.value) {
    return 'La fecha de inicio no puede ser posterior a la fecha de fin.';
  }

  const rangeDays = (new Date(endDate.value).getTime() - new Date(startDate.value).getTime()) / MS_PER_DAY;
  if (rangeDays > MAX_REPORT_RANGE_DAYS) {
    return `El rango de fechas no puede superar los ${MAX_REPORT_RANGE_DAYS} días.`;
  }

  return null;
});

const canSubmit = computed(() => !!startDate.value && !!endDate.value && !validationError.value);

const download = (format: ReportFormat) => {
  if (!canSubmit.value || !startDate.value || !endDate.value) return;

  mutate({
    startDate: startDate.value,
    endDate: endDate.value,
    format,
    ...(statusOption.value.value !== ALL_STATUSES_OPTION.value
      ? { status: String(statusOption.value.value) }
      : {}),
    ...(paymentStatusOption.value.value !== ALL_PAYMENT_STATUSES_OPTION.value
      ? { paymentStatus: String(paymentStatusOption.value.value) }
      : {}),
  });
};
</script>
