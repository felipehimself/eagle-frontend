import { CNPJ_LENGTH, CPF_LENGTH } from '@/constants';
import { z } from 'zod';
export const optionalDate = z
  .string()
  .optional()
  .refine(
    (value) => !value || /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/.test(value),
    {
      message: 'Formato inválido. Use AAAA-MM-DD ou AAAA-MM-DDTHH:mm:ss',
    },
  );

export const requiredDate = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/,
    'Formato inválido. Use AAAA-MM-DD ou AAAA-MM-DDTHH:mm:ss',
  );

export const requiredPlaca = z
  .string()
  .trim()
  .regex(/^[A-Z]{3}-(\d{4}|\d[A-Z]\d{2})$/, {
    message: 'Formato de placa inválido. Use LLL-NNNN ou LLL-NLNN.',
  });

export const optionalNullabledDate = z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) =>
      !val ||
      val === '' ||
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/.test(val),
    {
      message: 'Data inválida',
    },
  );

export const optionalCNPJ = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || val.length === CNPJ_LENGTH);

export const optionalCPF = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || val.length === CPF_LENGTH);
