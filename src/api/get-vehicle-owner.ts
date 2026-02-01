import { API_ROUTES } from '@/constants';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export type TVehicleOwner = {
  id: number;
  nome: string;
  email: string;
  telefone: null | string;
  dataNascimento: string;
  dataCadastro: string;
  ativo: boolean;
  cpf: string;
  cnpj: string;
  situacaoCadastral: null | boolean;
  pessoaTipos: null | unknown;
  enderecos: null | unknown;
  documentos: null | unknown;
  dadosFinanceiros: null | unknown;
  veiculoPessoas: null | unknown;
};

export const getVehicleOwner = async (
  cpfCnpj: string
): Promise<TVehicleOwner> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.Pessoas.url + `?cpfCnpj=${cpfCnpj}`);
};

type QueryFnType = typeof getVehicleOwner;

type UseGetVehicleOwnerOptions = {
  config?: QueryConfig<QueryFnType>;
  cpfCnpj: string;
};

export const useGetVehicleOwner = ({
  config = {},
  cpfCnpj,
}: UseGetVehicleOwnerOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetVehicleOwners', cpfCnpj],
    queryFn: () => getVehicleOwner(cpfCnpj),
  });
};
