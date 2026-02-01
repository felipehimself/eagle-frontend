import { API_ROUTES } from '@/constants';
import { TVehicleSchema } from '@/features/vehicles/types/vehicle.type';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';

export const getVehicles = async (): Promise<TVehicleSchema[]> => {
  const axios = axiosInstance();
  return axios.get(API_ROUTES.Veiculo.url);
};

type QueryFnType = typeof getVehicles;

type UseGetVehiclesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetVehicles = ({ config }: UseGetVehiclesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetVehicles'],
    queryFn: getVehicles,
  });
};
