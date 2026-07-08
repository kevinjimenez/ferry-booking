<template>
  <div class="w-full flex flex-col gap-y-5">
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="firstName" label="Nombres" :error="firstNameError" />
      <BaseInput v-model="lastName" label="Apellidos" :error="lastNameError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseInput v-model="email" label="Email" :error="emailError" />
      <BaseInput v-model="phone" label="Telefono" :error="phoneError" />
    </div>
    <div class="flex flex-col sm:flex-row gap-y-3 sm:gap-x-5">
      <BaseSelect v-model="documentType" :options="[{ label: 'Cedula', value: 'DNI' }]" label="Tipo documento"
        :error="documentTypeError" />
      <BaseInput v-model="documentNumber" label="No Documento" :error="documentNumberError" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from '@/shared/components/ui/BaseInput.vue';
import BaseSelect, { type SelectOption } from '@/shared/components/ui/BaseSelect.vue';
import { useField } from 'vee-validate';

const props = defineProps<{ namePrefix: string }>();
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
