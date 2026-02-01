import {
  optionalCNPJ,
  optionalCPF,
  optionalDate,
  optionalNullabledDate,
  requiredDate,
  requiredPlaca,
} from '@/types';
import { z } from 'zod';

export const vehicleSchema = z.object({
  id: z.number().optional(),
  regiaoBaseId: z.number().min(1, 'Obrigatório'),
  clienteId: z.number().min(1, 'Obrigatório'),
  locadoraId: z.union([z.number(), z.string()]).optional(),
  tipoVinculoId: z.number().min(1, 'Obrigatório'),
  fabricanteId: z.number().optional(),
  dataInicioOperacao: requiredDate,
  dataFimOperacao: optionalNullabledDate,
  cor: z.string().trim().toUpperCase().optional(),
  valorImplemento: z.union([z.number(), z.string()]).optional(),
  ativo: z.boolean(),
  tipoVeiculoId: z.number(),
  observacoes: z.string().trim().optional(),
  categoriaMeliId: z.union([z.number(), z.string()]).optional(),

  cnpj: optionalCNPJ,
  cpf: optionalCPF,
  tipoDocumento: z.enum(['CNPJ', 'CPF']).nonoptional(),
  dataEmissaoGR: optionalDate,

  exercicioCrlv: z.number().min(1000),
  placa: requiredPlaca,
  dataVencimentoGR: optionalDate,
  editarFotosVeiculo: z
    .array(
      z.object({
        file: z.file(),
        secureUrl: z.string(),
        publicId: z.string().optional(),
        id: z.string().optional(),
        url: z.string().optional(),
        dataUpload: z.string().optional(),
        ativo: z.boolean().optional(),
        tipoImagem: z.enum(['1', '2']).optional(),
        hidden: z.boolean().optional(),
      }),
    )
    .optional(),
  editarCrlvsVeiculo: z
    .array(
      z.object({
        file: z.file(),
        secureUrl: z.string(),
        publicId: z.string().optional(),
        id: z.string().optional(),
        url: z.string().optional(),
        dataUpload: z.string().optional(),
        ativo: z.boolean().optional(),
        tipoImagem: z.enum(['1', '2']).optional(),
        hidden: z.boolean().optional(),
      }),
    )
    .optional(),
  fotosVeiculo: z.array(z.union([z.file(), z.object()])).optional(),
  imagemCrlv: z.array(z.union([z.file(), z.object()])).optional(),
  novasImagemCrlv: z.array(z.file()).optional(),
  renavam: z.string().min(1),
  vencimentoCrlv: optionalDate,
  motorId: z.number().optional(),
  anoVeiculo: z.number().min(1000),
  modelo: z.string().trim().toUpperCase().optional(),
  localidadeVeiculo: z.string().optional(),
  chassi: z.string().length(17, 'Chassi deve ter 17 caracteres'),
  anoFabricacao: z.number().min(1000),
  ufDetran: z.string().optional(),
  gravame: z.boolean().optional(),
  dataGarantia: optionalDate,
  valorVeiculo: z.union([z.number(), z.string()]).optional(),
  nome: z.string().trim().toUpperCase().min(1, 'Obrigatório'),
  pessoaId: z.string().optional(),
  documentos: z
    .array(
      z
        .object({
          id: z.number().optional(),
          pessoaId: z.number().optional(),
          veiculoId: z.number().optional(),
          tipoDocumentoId: z.number().optional(),
          documentoANTT: z.nullable(z.string()).optional(),
          documentoOutros: z.object({
            id: z.number().optional(),
            documentoId: z.number().optional(),
            dtEmissaoGR: z.string().nullable().optional(),
            dtVencimentoGR: z.string().nullable().optional(),
            dtGRMMotorista: z.string().nullable().optional(),
          }),
        })
        .optional(),
    )
    .optional(),
});

export type TVehicleSchema = z.infer<typeof vehicleSchema>;
