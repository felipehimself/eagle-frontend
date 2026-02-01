import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export type TTipoServico = {
  id: number;
  nome: string;
};

export const getTiposServico = async (): Promise<TTipoServico[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.TiposServicos.url);
};

type QueryFnType = typeof getTiposServico;

type UseGetTiposServico = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetTiposServico = ({ config }: UseGetTiposServico = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetTiposServico'],
    queryFn: getTiposServico,
  });
};
