import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { TRegionSchema } from '../types/regions.type';

export const postRegion = async ({
  ativo,
  nome,
}: TRegionSchema): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.post(API_ROUTES.RegioesBase.url, { ativo, nome });
};

type UsePostRegionOptions = {
  config?: MutationConfig<typeof postRegion>;
};

export const usePostRegion = ({ config }: UsePostRegionOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao cadastrar região/base', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['useGetRegions']);
      toaster.addNotification('Região/base cadastrada com sucesso!', {
        variant: 'success',
      });
    },
    ...config,

    mutationFn: postRegion,
  });
};
