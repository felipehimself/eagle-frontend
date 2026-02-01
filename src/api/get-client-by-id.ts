import { API_ROUTES } from '@/constants/api';
import { TClientSchema } from '@/features/clients/types/client.type';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { TClientResponse } from '@/types';
import { Formatter } from '@/utils/common';
import { useQuery } from 'react-query';

const f = new Formatter();

export const getClientById = async (id: string): Promise<TClientSchema> => {
  const axios = axiosInstance();

  const res = (await axios.get(
    API_ROUTES.Clientes.url + `/${id}`
  )) as TClientResponse;

  const sanitizedCNPJ = f.formatCNPJ(res?.pessoaTipo?.pessoa?.cnpj || '');
  const sanitizedCEP = f.formatCEP(
    res?.pessoaTipo?.pessoa?.enderecos?.[0]?.cep || ''
  );
  const sanitizedTelefone = f.formatPhone(
    res?.pessoaTipo?.pessoa?.telefone || ''
  );

  return {
    id: res.id,
    cnpj: sanitizedCNPJ,
    flex: res.isFlex,
    nome: res?.pessoaTipo?.pessoa?.nome,
    bairro: res.pessoaTipo?.pessoa?.enderecos?.[0]?.bairro,
    cep: sanitizedCEP,
    complemento: res.pessoaTipo?.pessoa?.enderecos?.[0]?.complemento,
    email: res.pessoaTipo?.pessoa?.email,
    uf: res.pessoaTipo?.pessoa?.enderecos?.[0]?.uf,
    endereco: res.pessoaTipo?.pessoa?.enderecos?.[0]?.logradouro,
    logradouro: res.pessoaTipo?.pessoa?.enderecos?.[0]?.logradouro,
    municipio: res.pessoaTipo?.pessoa?.enderecos?.[0]?.cidade,
    numero: res.pessoaTipo?.pessoa?.enderecos?.[0]?.numero,
    regioesBaseId: res.regioesBase.map((r) => r.id),
    telefone: sanitizedTelefone,
  } as TClientSchema;
};

type QueryFnType = typeof getClientById;

type UseGetClientByIdOptions = {
  config?: QueryConfig<QueryFnType>;
  id: string;
};

export const useGetClientById = ({ config, id }: UseGetClientByIdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetClientById', id],
    queryFn: () => getClientById(id),
  });
};
