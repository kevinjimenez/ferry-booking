<template>
  <div class="w-full flex flex-col gap-y-5">
    <div v-if="!showLegalName" class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="firstName" :label="$t('ferry.ferryPersonForm.firstName')" :error="firstNameError" />
      <BaseInput v-model="lastName" :label="$t('ferry.ferryPersonForm.lastName')" :error="lastNameError" />
    </div>
    <div v-else class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="legalName" :label="$t('ferry.ferryPersonForm.legalName')" :error="legalNameError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseSelect v-model="country" :options="COUNTRIES" :label="$t('ferry.ferryPersonForm.country')"
        :placeholder="$t('ferry.ferryPersonForm.countryPlaceholder')" :error="countryError" />
      <BaseInput v-model="city" :label="$t('ferry.ferryPersonForm.city')" :error="cityError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="email" :label="$t('ferry.ferryPersonForm.email')" :error="emailError" />
      <BaseInput v-model="phone" :label="$t('ferry.ferryPersonForm.phone')" :error="phoneError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseSelect v-model="documentType" :options="documentTypeOptions" :label="$t('ferry.ferryPersonForm.documentType')"
        :placeholder="$t('ferry.ferryPersonForm.documentTypePlaceholder')" :error="documentTypeError" />
      <BaseInput v-model="documentNumber" :label="$t('ferry.ferryPersonForm.documentNumber')" :error="documentNumberError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInputDate v-model="dateOfBirth" :label="$t('ferry.ferryPersonForm.dateOfBirth')" :max-date="new Date()"
        :placeholder="$t('ferry.ferryPersonForm.dateOfBirthPlaceholder')" :error="dateOfBirthError" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from '@/shared/components/ui/BaseInput.vue';
import BaseInputDate from '@/shared/components/ui/BaseInputDate.vue';
import BaseSelect, { type SelectOption } from '@/shared/components/ui/BaseSelect.vue';
import { useField } from 'vee-validate';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { COUNTRIES } from '@/shared/constants/countries.constants.ts';
import { DOCUMENT_TYPES } from '@/modules/ferry/constants/passenger-details-form.constants.ts';

const props = defineProps<{ namePrefix: string, showLegalName?: boolean }>();

const { t } = useI18n();
const documentTypeOptions = computed(() =>
  DOCUMENT_TYPES.map(option => ({ ...option, label: t(option.label) })),
);
const {
  value: firstName,
  errorMessage: firstNameError,
  // handleChange: firstNameChange,
} = useField<string>(`${props.namePrefix}.firstName`);
const {
  value: lastName,
  errorMessage: lastNameError,
  // handleChange: lastNameChange,
} = useField<string>(`${props.namePrefix}.lastName`);
const {
  value: legalName,
  errorMessage: legalNameError,
  // handleChange: firstNameChange,
} = useField<string>(`${props.namePrefix}.legalName`);
const {
  value: country,
  errorMessage: countryError,
  // handleChange: firstNameChange,
} = useField<SelectOption | null>(`${props.namePrefix}.country`);
const {
  value: city,
  errorMessage: cityError,
  // handleChange: firstNameChange,
} = useField<string>(`${props.namePrefix}.city`);
const {
  value: email,
  errorMessage: emailError,
  // handleChange: emailChange,
} = useField<string>(`${props.namePrefix}.email`);
const {
  value: phone,
  errorMessage: phoneError,
  // handleChange: phoneChange,
} = useField<string>(`${props.namePrefix}.phone`);
const {
  value: documentNumber,
  errorMessage: documentNumberError,
  // handleChange: documentNumberChange,
} = useField<string>(`${props.namePrefix}.documentNumber`);
const {
  value: documentType,
  errorMessage: documentTypeError,
  // handleChange: documentTypeChange,
} = useField<SelectOption | null>(`${props.namePrefix}.documentType`);
const {
  value: dateOfBirth,
  errorMessage: dateOfBirthError,
} = useField<string | null>(`${props.namePrefix}.dateOfBirth`);
</script>
