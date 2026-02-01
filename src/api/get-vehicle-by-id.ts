import { API_ROUTES } from '@/constants';
import { TVehicleSchema } from '@/features/vehicles/types/vehicle.type';
import { axiosInstance } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Formatter, getTipoDocumento } from '@/utils';
import { useQuery } from 'react-query';

const f = new Formatter();

export const getVehicleById = async (id: string): Promise<TVehicleSchema> => {
  const axios = axiosInstance();
  const res = (await axios.get(
    API_ROUTES.Veiculo.url + '/' + id,
  )) as TVehicleSchema;

  return {
    ...res,
    locadoraId: res.locadoraId === 0 ? undefined : res.locadoraId,
    valorImplemento: res?.valorImplemento
      ? String(res?.valorImplemento)
      : undefined,
    valorVeiculo: String(res?.valorVeiculo) || undefined,
    placa: f.parsePlaca(res?.placa),
    tipoDocumento: getTipoDocumento(res?.cnpj),
  };
};

type QueryFnType = typeof getVehicleById;

type UseGetVehicleOwnerOptions = {
  config?: QueryConfig<QueryFnType>;
  id: string;
};

export const useGetVehicleById = ({
  config = {},
  id,
}: UseGetVehicleOwnerOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['useGetVehicleById', id],
    queryFn: () => getVehicleById(id),
  });
};
