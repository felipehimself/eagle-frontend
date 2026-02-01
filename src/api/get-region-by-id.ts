import { API_ROUTES } from '@/constants/api';
import { TRegionSchema } from '@/features/regions/types/regions.type';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export const getRegionById = async (id: number): Promise<TRegionSchema> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.RegioesBase.url + `/${id}`);
};

type QueryFnType = typeof getRegionById;

type UseGetRegionByIdOptions = {
  config?: QueryConfig<QueryFnType>;
  id: number;
};

export const useGetRegionById = ({ config, id }: UseGetRegionByIdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetRegionsByid', id],
    queryFn: () => getRegionById(id),
  });
};
