import { TClient } from '@/types';
import { Formatter } from '@/utils/common';
import { TClientSchema } from '../types/client.type';

const f = new Formatter();

export const createClientPayload = (data: TClientSchema): TClient => {
  const sanitizedCNPJ = f.removeNonDigits(data?.cnpj || '');
  const sanitizedCEP = f.removeNonDigits(data?.cep || '');
  const sanitizedTelefone = f.removeNonDigits(data?.telefone || '');

  return {
    ...(data.id && { id: data.id }),
    pessoa: {
      ...(data.id && { id: data.id }),
      nome: data?.nome?.toUpperCase() || null,
      email: data?.email?.toLowerCase() || null,
      telefone: sanitizedTelefone || null,
      dataNascimento: null,
      ativo: true,
      cnpj: sanitizedCNPJ || null,
      cpf: null,
    },
    isFlex: data.flex,
    regioesBaseId: data?.regioesBaseId ? data.regioesBaseId : [],
    endereco: data.flex
      ? {
          logradouro: data?.logradouro?.toUpperCase() || null,
          numero: data?.numero || null,
          complemento: data?.complemento?.toUpperCase() || null,
          bairro: data?.bairro?.toUpperCase() || null,
          cidade: data?.municipio?.toUpperCase() || null,
          uf: data?.uf?.toUpperCase() || null,
          cep: sanitizedCEP || null,
        }
      : null,
  };
};
