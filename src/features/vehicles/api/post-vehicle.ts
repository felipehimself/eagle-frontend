import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export const postVehicle = async ({
  data,
}: {
  data: FormData;
}): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.Veiculo.url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UsePostVehicle = {
  config?: MutationConfig<typeof postVehicle>;
};

export const usePostVehicle = ({ config }: UsePostVehicle = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification(
        // @ts-expect-error message can be anything
        e.response?.data?.message || 'Erro ao cadastrar veículo',
        {
          variant: 'error',
        },
      );
    },
    onSuccess: () => {
      toaster.addNotification('Veículo cadastrado com sucesso', {
        variant: 'success',
      });
    },
    ...config,
    mutationFn: postVehicle,
  });
};
