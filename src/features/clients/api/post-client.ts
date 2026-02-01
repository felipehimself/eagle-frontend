import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { TClient } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export const postClient = async (
  client: TClient
): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.Clientes.url, client);
};

type UsePostClientOptions = {
  config?: MutationConfig<typeof postClient>;
};

export const usePostClient = ({ config }: UsePostClientOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      const msg = e.response?.data as string;
      toaster.addNotification(msg || 'Erro ao cadastrar cliente', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['useGetClients']);
      toaster.addNotification('Cliente cadastrado com sucesso', {
        variant: 'success',
      });
    },
    ...config,

    mutationFn: postClient,
  });
};
