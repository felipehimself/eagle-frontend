import { API_ROUTES } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
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
  return useMutation({
    ...config,
    mutationFn: postConfirmAuth,
  });
};
