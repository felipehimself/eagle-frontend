import { z } from 'zod';

export const routeSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  cliente: z.number(),
  regiaoBase: z.number().min(1, 'Pelo menos uma região base é obrigatória'),
  motorista: z.string().min(1, 'Motorista é obrigatório'),
  placa: z.string().min(1, 'Placa é obrigatória'),
  tipoVeiculo: z
    .array(z.string().min(1, 'Tipo de veículo não pode estar vazio'))
    .min(1, 'Pelo menos um tipo de veículo é obrigatório'),
  tipoServico: z
    .array(z.string().min(1, 'Tipo de serviço não pode estar vazio'))
    .min(1, 'Pelo menos um tipo de serviço é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  ajudante: z.string().min(1, 'Ajudante é obrigatório'),
  paradas: z.string().min(1),
  pacotes: z.string().min(1, 'Pacotes é obrigatório'),
  pontos: z.string().min(1),
  qtdKm: z.string().min(1),
  valorDiaria: z.string().min(1, 'Valor diária é obrigatório'),
  valorBonusParada: z.string().min(1, 'Valor bônus parada é obrigatório'),
  valorBonusPorKm: z.string().min(1, 'Valor bônus por KM é obrigatório'),
  valorAdicionalDomingoFeriado: z
    .string()
    .min(1, 'Valor adicional domingo/feriado é obrigatório'),
  valorAjudante: z.string().min(1, 'Valor ajudante é obrigatório'),
  valorTotal: z.number().nonnegative('Valor total não pode ser negativo'),
  observacao: z.string(),
  apoioMotorista: z.string().optional(),
  apoioPlaca: z.string().optional(),
  apoioTipoVeiculo: z.string().optional(),
  apoioPacotes: z.string().optional(),
  valorApoioDiaria: z.string().optional(),
  descontarMotoristaPrincipal: z.boolean(),
  valorDescontoMotorista: z.string().optional(),
});

export type TRouteSchema = z.infer<typeof routeSchema>;
