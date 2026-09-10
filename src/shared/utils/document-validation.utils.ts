const CEDULA_COEFFICIENTS = [2, 1, 2, 1, 2, 1, 2, 1, 2];
const RUC_PRIVATE_COMPANY_COEFFICIENTS = [4, 3, 2, 7, 6, 5, 4, 3, 2];
const RUC_PUBLIC_ENTITY_COEFFICIENTS = [3, 2, 7, 6, 5, 4, 3, 2];

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

const isValidModulo11Checksum = (
  value: string,
  coefficients: number[],
  verifierIndex: number,
): boolean => {
  let sum = 0;
  for (let i = 0; i < coefficients.length; i++) {
    sum += Number(value.charAt(i)) * coefficients[i]!;
  }

  const remainder = sum % 11;
  const verifier = remainder === 0 ? 0 : 11 - remainder;
  return verifier === Number(value.charAt(verifierIndex));
};

/**
 * RUC ecuatoriano: 13 dígitos, provincia 01-24. El checksum depende del
 * tercer dígito:
 * - 0-5: persona natural, los primeros 10 dígitos forman una cédula válida
 *   y termina en "001".
 * - 9: sociedad privada, checksum módulo 11 sobre los primeros 9 dígitos.
 * - 6: entidad pública, checksum módulo 11 sobre los primeros 8 dígitos.
 */
export const isValidEcuadorianRuc = (value: string): boolean => {
  if (!/^\d{13}$/.test(value)) return false;

  const province = Number(value.slice(0, 2));
  if (province < 1 || province > 24) return false;

  const thirdDigit = Number(value[2]);

  if (thirdDigit <= 5) {
    return value.endsWith('001') && isValidEcuadorianCedula(value.slice(0, 10));
  }
  if (thirdDigit === 9) {
    return (
      value.slice(-3) !== '000' &&
      isValidModulo11Checksum(value, RUC_PRIVATE_COMPANY_COEFFICIENTS, 9)
    );
  }
  if (thirdDigit === 6) {
    return isValidModulo11Checksum(value, RUC_PUBLIC_ENTITY_COEFFICIENTS, 8);
  }

  return false;
};

/** Pasaporte: alfanumérico, 6-9 caracteres (el formato varía por país). */
export const isValidPassport = (value: string): boolean => /^[A-Za-z0-9]{6,9}$/.test(value);
