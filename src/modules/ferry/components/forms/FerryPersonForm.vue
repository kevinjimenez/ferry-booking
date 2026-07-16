<template>
  <div class="w-full flex flex-col gap-y-5">
    <div v-if="!showLegalName" class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="firstName" label="Nombres" :error="firstNameError" />
      <BaseInput v-model="lastName" label="Apellidos" :error="lastNameError" />
    </div>
    <div v-else class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="legalName" label="Razón social" :error="legalNameError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseSelect v-model="country" :options="COUNTRIES" label="País" placeholder="Seleccione un país"
        :error="countryError" />
      <BaseInput v-model="city" label="Ciudad" :error="cityError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="email" label="Email" :error="emailError" />
      <BaseInput v-model="phone" label="Telefono" :error="phoneError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseSelect v-model="documentType" :options="DOCUMENT_TYPES" label="Tipo documento"
        placeholder="Seleccione el tipo de documento" :error="documentTypeError" />
      <BaseInput v-model="documentNumber" label="No. Documento" :error="documentNumberError" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from '@/shared/components/ui/BaseInput.vue';
import BaseSelect, { type SelectOption } from '@/shared/components/ui/BaseSelect.vue';
import { useField } from 'vee-validate';
import { COUNTRIES } from '@/shared/constants/countries.constants.ts';
import { DOCUMENT_TYPES } from '@/modules/ferry/constants/passenger-details-form.constants.ts';

const props = defineProps<{ namePrefix: string, showLegalName?: boolean }>();
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
</script>
