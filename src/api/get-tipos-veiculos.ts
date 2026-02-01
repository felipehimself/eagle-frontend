import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export type TTipoVeiculo = {
  id: number;
  nome: string;
  tarifarios: null;
};

export const getTiposVeiculo = async (): Promise<TTipoVeiculo[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.TiposVeiculos.url);
};

type QueryFnType = typeof getTiposVeiculo;

type UseGetTiposVeiculo = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetTiposVeiculo = ({ config }: UseGetTiposVeiculo = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetTiposVeiculo'],
    queryFn: getTiposVeiculo,
  });
};
