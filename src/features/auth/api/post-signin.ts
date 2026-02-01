import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { TSigninSchema } from '../types';

export type TSignedin = {
  accessToken: string;
  nome: string;
  email: string;
  nomePerfil: string;
  funcionalidades: string;
};

export const postSignin = async ({
  email,
  senha,
}: TSigninSchema): Promise<TSignedin> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.Signin.url, { email, senha });
};

type UseSigninOptions = {
  config?: MutationConfig<typeof postSignin>;
};

export const useSignin = ({ config }: UseSigninOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    // onMutate: async ({ destination }) => {},
    // onSuccess: () => {},

    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao efetuar login', {
        variant: 'error',
      });
    },
    ...config,

    mutationFn: postSignin,
  });
};
