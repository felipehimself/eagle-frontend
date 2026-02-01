import { API_ROUTES } from '@/constants/api';
import { useNotification } from '@/hooks/use-notification';
import { axiosInstance } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { TRegionSchema } from '../types/regions.type';

export const putRegion = async ({
  ativo,
  nome,
  id,
}: TRegionSchema): Promise<AxiosResponse<null>> => {
  const axios = axiosInstance();

  return axios.put(API_ROUTES.RegioesBase.url, { ativo, nome, id });
};

type UsePutRegionOptions = {
  config?: MutationConfig<typeof putRegion>;
};

export const usePutRegion = ({ config }: UsePutRegionOptions = {}) => {
  const toaster = useNotification();

  return useMutation({
    onError: (e: AxiosError) => {
      console.log(e);
      toaster.addNotification('Erro ao editar região/base', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['useGetRegions']);
      toaster.addNotification('Região/Base editada com sucesso!', {
        variant: 'success',
      });
    },
    ...config,

    mutationFn: putRegion,
  });
};
