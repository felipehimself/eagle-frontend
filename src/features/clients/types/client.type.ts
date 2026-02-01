import { z } from 'zod';

export const clientSchema = z
  .object({
    id: z.number().optional(),
    nome: z.string().trim().min(1, 'Obrigatório'),
    cnpj: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val || val === '' || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val),
        {
          message: 'CNPJ inválido',
        }
      ),
    regioesBaseId: z.array(z.number()).optional(),

    email: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) =>
          !val ||
          val === '' ||
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
        {
          message: 'E-mail inválido',
        }
      ),

    telefone: z
      .string()
      // .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "(00) 0000-0000)")
      .optional()
      // .refine(
      //   (val) => !val || val === '' || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val),
      //   {
      //     message: '(00) 0000-0000)',
      //   }
      // ),
      .refine(
        (val) => !val || val === '' || val?.length === 14 || val?.length === 15,
        {
          message: '(00) 0000-0000) ou (00) 00000-0000',
        }
      ),
    flex: z.boolean(),
    cep: z
      .string()
      .optional()
      .refine((val) => !val || val === '' || /^\d{5}-\d{3}$/.test(val), {
        message: 'XXXXX-XXX',
      }),
    // .regex(/^\d{5}-\d{3}$/, 'XXXXX-XXX')
    // .optional(),
    logradouro: z.string().trim().optional(),
    numero: z.string().trim().optional(),
    complemento: z.string().trim().optional(),
    bairro: z.string().trim().optional(),
    uf: z.string().trim().optional(),
    municipio: z.string().trim().optional(),
    // para evitar erro TS
    endereco: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (!data.flex) return true; // ignore, will be validated in next refine

      const requiredFields = [
        data.cep,
        data.logradouro,
        data.numero,
        data.bairro,
        data.uf,
        data.municipio,
      ];
      return requiredFields.every(
        (v) => typeof v === 'string' && v.trim().length > 0
      );
      // return (
      //   data.cep &&
      //   data.logradouro &&
      //   data.numero &&
      //   data.bairro &&
      //   data.uf &&
      //   data.municipio
      // );
    },
    {
      message: 'Endereço é obrigatório quando Flex está ativado.',
      path: ['endereco'], // place the error somewhere
    }
  )
  .refine(
    (data) => {
      if (data.flex) return true; // ignore
      return (data.regioesBaseId || []).length > 0;
    },
    {
      message: 'Região Base é obrigatória quando Flex está desativado.',
      path: ['regioesBaseId'],
    }
  );

export type TClientSchema = z.infer<typeof clientSchema>;
