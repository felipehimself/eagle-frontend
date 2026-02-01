// import { z } from 'zod';

// export const tariffSchema = z.object({
//   id: z.number().optional(),
//   // categoria: z.string().min(1, 'Obrigatório'),
//   tipoVeiculo: z.string().min(1, 'Obrigatório').optional(),
//   tipoVinculo: z.string().optional(),
//   cliente: z.number().min(1, 'Obrigatório'),
//   cidade: z.string().optional(),
//   diariaMotorista: z.string().optional(),
//   diariaMotoristaDomFer: z.string().optional(),
//   diariaAjudante: z.string().optional(),
//   diariaAjudanteDomFer: z.string().optional(),
//   domingoOuFeriado: z.boolean().optional(),
//   zonas: z.array(z.number()).optional(), // o erro deverá ser tratado no onSubmit caso n preencha
//   am: z.boolean().optional(),
//   pm: z.boolean().optional(),

//   // ============================= //

//   regiaoBase: z.number().optional(), // o erro deverá ser tratado no onSubmit caso n preencha  .min(1, 'Obrigatório'),
//   tipoViagem: z.string().optional(), // o erro deverá ser tratado no onSubmit caso n preencha .min(1, 'Obrigatório'),
//   tipoOperacao: z.string().optional(), //  o erro deverá ser tratado no onSubmit caso n preencha .min(1, 'Obrigatório'),

//   periodo: z.string().min(1, 'Obrigatório'),
//   somenteDomFeriado: z.boolean(),
//   naoAplicaDomFeriado: z.boolean(),
//   naoSeAplicaFeriado: z.boolean(),
//   aplicaseOnde: z.boolean(),
//   sdd: z.boolean(),
//   versionamento: z.boolean().optional(),
//   inicio: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   fim: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   regraVariavel: z.number().min(1, 'Obrigatório'),
//   // cidade: z.string(),
// });

// export type TTariffSchema = z.infer<typeof tariffSchema>;
