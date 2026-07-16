const CEDULA_COEFFICIENTS = [2, 1, 2, 1, 2, 1, 2, 1, 2];

/**
 * Cédula ecuatoriana: 10 dígitos, provincia 01-24, tercer dígito 0-5
 * (persona natural), dígito verificador con checksum módulo 10.
 */
export const isValidEcuadorianCedula = (value: string): boolean => {
  if (!/^\d{10}$/.test(value)) return false;

  const province = Number(value.slice(0, 2));
  if (province < 1 || province > 24) return false;

  const thirdDigit = Number(value[2]);
  if (thirdDigit > 5) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = Number(value.charAt(i)) * CEDULA_COEFFICIENTS[i]!;
    if (digit >= 10) digit -= 9;
    sum += digit;
  }

  const verifier = (10 - (sum % 10)) % 10;
  return verifier === Number(value.charAt(9));
};

/**
 * RUC ecuatoriano de persona natural: 13 dígitos, los primeros 10 forman
 * una cédula válida, y termina en "001" (establecimiento principal).
 * No cubre RUC de entidades públicas/jurídicas (checksum distinto).
 */
export const isValidEcuadorianRuc = (value: string): boolean => {
  if (!/^\d{13}$/.test(value)) return false;
  if (!value.endsWith('001')) return false;
  return isValidEcuadorianCedula(value.slice(0, 10));
};

/** Pasaporte: alfanumérico, 6-9 caracteres (el formato varía por país). */
export const isValidPassport = (value: string): boolean => /^[A-Za-z0-9]{6,9}$/.test(value);
