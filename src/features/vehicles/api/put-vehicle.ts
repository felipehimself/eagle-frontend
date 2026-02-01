import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

type TPayload = {
  data: FormData;
  id: string;
};
export const putVehicle = async (
  payload: TPayload,
): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.put(API_ROUTES.Veiculo.url + '/' + payload.id, payload.data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UsePutVehicle = {
  config?: MutationConfig<typeof putVehicle>;
  data?: TPayload;
};

export const usePutVehicle = ({ config }: UsePutVehicle = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification(
        // @ts-expect-error any
        e.response?.data?.message || 'Erro ao editar veículo',
        {
          variant: 'error',
        },
      );
    },
    onSuccess: () => {
      toaster.addNotification('Veículo editado com sucesso', {
        variant: 'success',
      });
    },
    ...config,
    mutationFn: putVehicle,
  });
};
