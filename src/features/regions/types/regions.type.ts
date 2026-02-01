import { z } from 'zod';

export const regionSchema = z.object({
  id: z.number().optional(),
  nome: z.string().trim().min(1, 'Obrigatório'),
  // .transform((name) => name.trim()),
  ativo: z.boolean().nonoptional(),
});

export type TRegionSchema = z.infer<typeof regionSchema>;
