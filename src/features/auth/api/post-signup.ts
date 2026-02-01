import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { TSignupSchema } from '../types';

export const postSignup = async ({
  email,
  senha,
  nome,
}: TSignupSchema): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.Usuarios.url, {
    email,
    senha,
    nome,
    confirmacaoSenha: senha,
  });
};

type UseSignupOptions = {
  config?: MutationConfig<typeof postSignup>;
};

export const useSignup = ({ config }: UseSignupOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onSuccess: () => {
      toaster.addNotification('Verifique seu e-mail para ativar sua conta', {
        variant: 'success',
      });
    },

    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao se cadastrar', {
        variant: 'error',
      });
    },
    ...config,
    mutationFn: postSignup,
  });
};
