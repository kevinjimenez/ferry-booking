<template>
  <BaseCard :icon="UserIcon" :title="$t('ferry.ferryContactSection.title')"
    :subtitle="$t('ferry.ferryContactSection.subtitle')">
    <div class="flex gap-x-10">
      <BaseRadio class="text-xs font-semibold" v-for="option in contactTypeOptions" :key="option.value.toString()"
        name="contact-type" :value="option.value" :label="option.label" v-model="contactType" />
    </div>
    <FerryPersonForm :name-prefix="namePrefix" :show-legal-name="contactType !== 'natural_person'" />
    <BaseCheckbox v-model="copyContactData" :label="$t('ferry.ferryContactSection.useForFirstPassenger')"
      label-class="font-bold text-gray-500 underline" />
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@/shared/components/ui/BaseCard.vue';
import FerryPersonForm from '@/modules/ferry/components/forms/FerryPersonForm.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import BaseRadio from '@/shared/components/ui/BaseRadio.vue';
import BaseCheckbox from '@/shared/components/ui/BaseCheckbox.vue';
import { useField, useFormContext } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { CONTACT_TYPES } from '@/modules/ferry/constants/passenger-details-form.constants.ts';

const props = defineProps<{ namePrefix: string }>();

const { t } = useI18n();
const form = useFormContext();
const copyContactData = ref(false);

const contactTypeOptions = computed(() =>
  CONTACT_TYPES.map(option => ({ ...option, label: t(option.label) })),
);

const { value: contactType } = useField<string>(`${props.namePrefix}.contactType`);
const { value: legalName } = useField<string>(`${props.namePrefix}.legalName`);
const { value: firstName } = useField<string>(`${props.namePrefix}.firstName`);
const { value: lastName } = useField<string>(`${props.namePrefix}.lastName`);

watch(contactType, newValue => {
  if (newValue === 'natural_person') {
    legalName.value = '';
  } else {
    firstName.value = ''
    lastName.value = ''
  }
});

watch(
  () => [copyContactData.value, contactType.value, form.values.contact] as const,
  ([copy, type, contact]) => {
    if (!copy || type !== 'natural_person') return;
    form.setFieldValue('passengers[0].firstName', contact.firstName);
    form.setFieldValue('passengers[0].lastName', contact.lastName);
    form.setFieldValue('passengers[0].email', contact.email);
    form.setFieldValue('passengers[0].phone', contact.phone);
    form.setFieldValue('passengers[0].documentType', contact.documentType);
    form.setFieldValue('passengers[0].documentNumber', contact.documentNumber);
    form.setFieldValue('passengers[0].country', contact.country);
    form.setFieldValue('passengers[0].city', contact.city);
  },
  { deep: true },
);
</script>
