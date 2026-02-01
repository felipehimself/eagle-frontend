import { API_ROUTES } from '@/constants/api';
import { TRegionSchema } from '@/features/regions/types/regions.type';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export const getRegions = async (): Promise<TRegionSchema[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.RegioesBase.url);
};

type QueryFnType = typeof getRegions;

type UseGetRegionsBaseOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetRegions = ({ config }: UseGetRegionsBaseOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetRegions'],
    queryFn: getRegions,
  });
};
