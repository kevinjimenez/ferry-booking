<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-6">
    <div class="bg-white w-full max-w-md flex flex-col gap-y-5 p-8 rounded-md shadow-lg">
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
      </div>

      <span v-if="validationError" class="text-secondary text-2xs font-semibold">{{ validationError }}</span>
      <span v-if="error" class="text-secondary text-2xs font-semibold">{{ error.message }}</span>

      <div class="flex flex-col sm:flex-row gap-2">
        <BaseButton class="w-full" :loading="isPending" :disabled="!canSubmit" @click="download('pdf')">
          Descargar PDF
        </BaseButton>
        <BaseButton class="w-full" variant="outline" :loading="isPending" :disabled="!canSubmit" @click="download('excel')">
          Descargar Excel
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
import { REPORT_STATUS_OPTIONS } from '@/modules/admin/constants/report-status.constants';
import { useDownloadTicketsReport, type ReportFormat } from '@/modules/admin/queries/download-report.query';

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);
const ALL_STATUSES_OPTION = REPORT_STATUS_OPTIONS[0]!;
const statusOption = ref(ALL_STATUSES_OPTION);

const { mutate, isPending, error } = useDownloadTicketsReport();

const validationError = computed(() => {
  if (!startDate.value || !endDate.value) return null;
  if (startDate.value > endDate.value) {
    return 'La fecha de inicio no puede ser posterior a la fecha de fin.';
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
    ...(statusOption.value.value ? { status: String(statusOption.value.value) } : {}),
  });
};
</script>
