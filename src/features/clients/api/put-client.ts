import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { TClient } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export const putClient = async (
  client: TClient
): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.put(API_ROUTES.Clientes.url, client);
};

type UsePutClientOptions = {
  config?: MutationConfig<typeof putClient>;
};

export const usePutClient = ({ config }: UsePutClientOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao atualizar cliente', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['useGetClients']);
      toaster.addNotification('Cliente atualizado com sucesso', {
        variant: 'success',
      });
    },
    ...config,

    mutationFn: putClient,
  });
};
