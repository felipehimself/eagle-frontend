import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export type TPayload = {
  usuarioId: string;
  codConfirmacao: string;
};

export const postConfirmAuth = async (params: TPayload): Promise<void> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.Usuarios.url + '/confirmacao-email', null, {
    params: {
      CodConfirmacao: params.codConfirmacao,
      UsuarioId: params.usuarioId,
    },
  });
};

type UseConfirmAuthOptions = {
  config?: MutationConfig<typeof postConfirmAuth>;
};

export const useConfirmAuth = ({ config }: UseConfirmAuthOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao confirmar conta', {
        variant: 'error',
      });
    },
    ...config,
    mutationFn: postConfirmAuth,
  });
};
