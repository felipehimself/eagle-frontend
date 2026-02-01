import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export type TCardBrand = {
  id: string;
  nome: string;
  veiculos?: unknown[];
};

export const getCardBrand = async (): Promise<TCardBrand[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.FabricantesVeiculos.url);
};

type QueryFnType = typeof getCardBrand;

type UseGetCardBrand = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCardBrands = ({ config }: UseGetCardBrand = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetCardBrand'],
    queryFn: getCardBrand,
  });
};
