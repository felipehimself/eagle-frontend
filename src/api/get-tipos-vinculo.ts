import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export type TTipoVeiculo = {
  id: number;
  nome: string;
  ativo: boolean;
  veiculos: unknown[];
};

export const getTiposVinculo = async (): Promise<TTipoVeiculo[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.TiposVinculo.url);
};

type QueryFnType = typeof getTiposVinculo;

type UseGetTiposVinculo = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetTiposVinculo = ({ config }: UseGetTiposVinculo = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetTiposVinculo'],
    queryFn: getTiposVinculo,
  });
};
