import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { TCategoriaMeli } from '@/types';
import { useQuery } from 'react-query';

export const getCategoriasMeli = async (): Promise<TCategoriaMeli[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.CategoriasMeli.url);
};

type QueryFnType = typeof getCategoriasMeli;

type UseGetCategoriasMeliOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCategoriasMeli = ({
  config,
}: UseGetCategoriasMeliOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetCategoriasMeli'],
    queryFn: getCategoriasMeli,
  });
};
