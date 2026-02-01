// import { z } from 'zod';

// export const driverSchema = z.object({
//   id: z.number().optional(),

//   // DADOS PRINCIPAIS
//   apto: z.boolean(),
//   cliente: z.array(z.string()).min(1),
//   status: z.string().trim().min(1),
//   tipoDeCadastro: z.string().trim().min(1),
//   tipoDeVinculo: z.string().trim().min(1),
//   dataInicio: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   nome: z.string().trim().min(1),
//   dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   celular: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, '(00) 00000-0000)'),
//   email: z.email('E-mail inválido'),
//   ufNaturalidade: z.string().trim().min(1),
//   possuiContratoAssinado: z.boolean(),
//   donoVeiculo: z.boolean(),
//   placa: z.string().regex(/^[A-Za-z0-9]{3}-[A-Za-z0-9]{4}$/, 'Placa inválida'),
//   veiculoResponsabilidade: z.boolean(),
//   numeroIdMeli: z.string().trim().optional(),
//   numeroIdShopee: z.string().trim().optional(),

//   // DOCUMENTOS
//   rg: z.string().trim().min(1),
//   dataEmissaoRg: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   orgaoEmissorRg: z.string().trim().min(1),
//   cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, ' XXX.XXX.XXX-XX'),

//   cnpjMei: z
//     .string()
//     .optional()
//     .refine(
//       (val) =>
//         !val || val === '' || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val),
//       {
//         message: 'XX.XXX.XXX/XXXX-XX',
//       }
//     ),

//   razaoSocial: z.string().trim().optional(), // opcional
//   situacaoCadastralRfb: z.string().optional(), // opcional
//   grMotoristaValidade: z // opcional
//     .string()
//     .optional()
//     .refine((val) => !val || val === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
//       message: 'DD/MM/AAAA',
//     }),

//   dataEmissaoGr: z // opcional
//     .string()
//     .optional()
//     .refine((val) => !val || val === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
//       message: 'DD/MM/AAAA',
//     }),
//   numeroCcm: z.string().trim().optional(), // opcional
//   numeroInscricaoInss: z.string().trim().optional(), // opcional

//   // CNH
//   numeroCnh: z
//     .string()
//     .optional()
//     .refine(
//       (val) => !val || val.length > 0, // passes if undefined OR non-empty
//       { message: 'Inválido' }
//     ),
//   categoriaCnh: z
//     .array(z.string())
//     .optional()
//     .refine(
//       (val) => {
//         return !val || val.length > 0;
//       },
//       {
//         message: 'Selecione pelo menos uma categoria',
//       }
//     ),
//   dataEmissaoCnh: z
//     .string()
//     .optional()
//     .refine((val) => !val || val === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
//       message: 'DD/MM/AAAA',
//     }),
//   dataVencimentoCnh: z
//     .string()
//     .optional()
//     .refine((val) => !val || val === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
//       message: 'DD/MM/AAAA',
//     }),
//   ufCnh: z
//     .string()
//     .optional()
//     .refine(
//       (val) => !val || val.length > 0, // passes if undefined OR non-empty
//       { message: 'Inválido' }
//     ),
//   municipioCnh: z
//     .string()
//     .optional()
//     .refine(
//       (val) => !val || val.length > 0, // passes if undefined OR non-empty
//       { message: 'Inválido' }
//     ),
//   renach: z
//     .string()
//     .optional()
//     .refine(
//       (val) => !val || val.length > 0, // passes if undefined OR non-empty
//       { message: 'Inválido' }
//     ),
//   espelho: z
//     .string()
//     .optional()
//     .refine(
//       (val) => !val || val.length > 0, // passes if undefined OR non-empty
//       { message: 'Inválido' }
//     ),
//   uploadCnhRg: z.string().optional(), // CLOUDINARY OU BLOB

//   // antt
//   rntrc: z.string().trim().min(1),
//   dataCadastro: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   dataValidade: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'DD/MM/AAAA'),
//   situacao: z.string().trim().min(1),

//   // endereco
//   cep: z
//     .string()
//     .regex(/^\d{5}-\d{3}$/, 'XXXXX-XXX')
//     .min(1),
//   logradouro: z.string().trim().min(1),
//   numero: z.string().trim().min(1),
//   complemento: z.string().trim().optional(),
//   bairro: z.string().trim().min(1),
//   uf: z.string().trim().min(1),
//   municipio: z.string().trim().min(1),

//   // financeiro
//   titularPjEmitente: z.boolean(),
//   prestaServicoTerceiros: z.boolean(),
//   nomeRazaoSocialTerceiros: z.string().optional(), // opcional
//   cnpjTerceiros: z // opcional
//     .string()
//     .optional()
//     .refine(
//       (val) =>
//         !val || val === '' || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val),
//       {
//         message: 'XX.XXX.XXX/XXXX-XX',
//       }
//     ),
//   contaBancariaTitularidadeCnpj: z.boolean(),
//   nomeBanco: z.string().trim().min(1),
//   codigoBanco: z.string().trim().min(1),
//   codigoAgencia: z.string().trim().min(1),
//   digitoAgencia: z.string().trim().optional(),
//   tipoConta: z.string().trim().min(1),
//   numeroConta: z.string().trim().min(1),
//   digitoConta: z.string().trim().min(1),
//   chavePix: z.string().trim().min(1),
//   tipoChavePix: z.string().nonoptional(),
//   observacao: z.string().trim().optional(),
// });

// export type TDriverSchema = z.infer<typeof driverSchema>;
